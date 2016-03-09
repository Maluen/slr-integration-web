import ws from 'ws';
import { authenticateMachine } from './server/services/Machine/authenticateMachine';
import callService from './server/callService';
import SearchState from './server/models/SearchState';
import Search from './server/models/Search';
import pick from 'lodash.pick';

// Note: the processing is asynchronous, thus
// consecutive requests are queued and processed one at a time,
// so that each will work on the output of the previous request.
let updateSearchStatePromise = null;
async function updateSearchState(id, updateFn) {
  while (updateSearchStatePromise) {
    await updateSearchStatePromise;
  }

  const promise = updateSearchStatePromise = Promise.resolve().then(async () => {
    let searchState;
    try {
      searchState = await SearchState.findById(id);
    } catch (err) {
      throw new Error(err.err);
    }
    if (!searchState) {
      throw new Error('The search state does not exist.');
    }

    searchState = updateFn(searchState);

    try {
      searchState = await searchState.save();
    } catch (err) {
      throw new Error(err.message);
    }

    return { searchState: searchState.toObject({ virtuals: true }) };
  }).then((response) => {
    updateSearchStatePromise = null;
    return response;
  }, (err) => {
    updateSearchStatePromise = null;
    throw new Error(err.message);
  });
  return promise;
}

function extendObj(newObj) {
  return (obj) => {
    return Object.assign(obj, newObj);
  };
}

export default class WebSocketServer {

  constructor(server) {
    this.server = server;

    this.clients = {}; // <conn id, conn data>
    this.machines = {}; // <machine id, conn id>

    this.searchStates = {}; // <search id, search state>
  }

  start() {
    this.wss = new ws.Server({ server: this.server, port: 7667 });

    this.wss.on('connection', this.handleConnection.bind(this));
  }

  handleConnection(conn) {
    const connId = conn.upgradeReq.headers['sec-websocket-key'];
    const client = this.clients[connId] = { connId, conn };
    console.log('Connected: %s', connId);

    conn.on('message', (rawMessage) => {
      console.log('Received: %s', rawMessage);

      // Only accept objects
      let message;
      try {
        message = JSON.parse(rawMessage);
        if (typeof message !== 'object' || message === null) throw new Error();
      } catch (e) {
        console.log('Invalid message!');
        return;
      }

      this.handleMessage(client, message);
    });

    conn.on('close', () => {
      console.log('Disconnected: %s', connId);

      delete this.clients[connId];
      delete this.machines[client.machineId];

      if (client.type === 'machine' && typeof client.machineId !== 'undefined') {
        updateSearchState(client.searchStateId, (searchState) => {
          if (searchState.status === 'running') {
            searchState.status = 'failure';
          }
          return searchState;
        })
        .then((response) => {
          const searchState = response.searchState;
          this.notifySearchListeners(client.searchId, searchState, { status: searchState.status });
        });
      }
    });

    // DEBUG
    //conn.send('{"user": "server"}');
  }

  handleMessage(client, message) {
    if (message.type === 'machine') {
      this.handleMachineMessages(client, message);
    } else if (message.type === 'user') {
      this.handleUserMessages(client, message);
    }
  }

  handleMachineMessages(client, message) {
    if (message.topic === 'login') {
      this.handleMachineLogin(client, message);
    } else if (message.topic === 'searchStatus') {
      this.handleMachineSearchStatus(client, message);
    } else if (message.topic === 'outputLine') {
      this.handleMachineOutputLine(client, message);
    } else if (message.topic === 'searchResult') {
      this.handleMachineSearchResult(client, message);
    }
  }

  async handleMachineLogin(client, message) {
    const { connId, conn } = client;

    //console.log('Machine requested login');

    const detail = message.detail;
    if (typeof detail !== 'object' || detail === null) return;

    const machineId = detail.id;
    const machineName = detail.name;
    const machinePassword = detail.password;

    let machine;
    try {
      const response = await callService(authenticateMachine, { id: machineId, name: machineName, password: machinePassword });
      machine = response.machine;
    } catch (err) {
      this.sendMessage(conn, 'loginError', { message: err.message });
      return;
    }

    this.sendMessage(conn, 'loginSuccess');

    client.type = 'machine';
    client.machineId = machine.id;
    this.machines[machine.id] = connId;

    // DEBUG
    //this.startSearch({ id: 'TODO_PROJECT' }, { id: 'TODO_SEARCH' }, { id: 'TODO' }, false);
  }

  async handleMachineSearchStatus(client, message) {
    const { connId, conn } = client;

    //console.log('Machine search status changed');

    const detail = message.detail;
    if (typeof detail !== 'object' || detail === null) return;

    const status = detail.status;

    const allowedStatus = ['running', 'success', 'failure'];
    if (allowedStatus.indexOf(status) === -1) {
      this.sendMessage(conn, 'searchStatusError', { message: 'Invalid status' });
      return;
    }

    let searchState;
    try {
      const response = await updateSearchState(client.searchStateId, extendObj({ status }));
      searchState = response.searchState;
    } catch (err) {
      this.sendMessage(conn, 'searchStatusError', { message: err.message });
    }

    this.notifySearchListeners(client.searchId, searchState, { status: searchState.status });
  }

  async handleMachineOutputLine(client, message) {
    const { connId, conn } = client;

    //console.log('Machine sent output line');

    const timestamp = message.timestamp;

    const detail = message.detail;
    if (typeof detail !== 'object' || detail === null) return;

    const line = detail.line;

    const outputToAppend = { line, timestamp };

    let searchState;
    try {
      const response = await updateSearchState(client.searchStateId, (editableSearchState) => {
        editableSearchState.output.push(outputToAppend);
        return editableSearchState;
      });
      searchState = response.searchState;
    } catch (err) {
      this.sendMessage(conn, 'outputLineError', { message: err.message });
    }

    this.notifySearchListeners(client.searchId, searchState, { output: [outputToAppend] }, 'push');
  }

  async handleMachineSearchResult(client, message) {
    const { connId, conn } = client;

    //console.log('Machine sent search result');

    const detail = message.detail;
    if (typeof detail !== 'object' || detail === null) return;

    const csv = detail.csv;

    let searchState;
    try {
      const response = await updateSearchState(client.searchStateId, extendObj({ resultCSV: csv }));
      searchState = response.searchState;
    } catch (err) {
      this.sendMessage(conn, 'searchStatusError', { message: err.message });
    }

    this.notifySearchListeners(client.searchId, searchState, { resultCSV: csv });
  }

  async startSearch(project, search, machine, resume) {
    console.log('Start search', project, search, machine);

    const connId = this.machines[machine.id];
    if (typeof connId === 'undefined') {
      // machine not found
      throw new Error('The requested machine is not connected.');
    }

    const client = this.clients[connId];

    client.projectId = project.id;
    client.searchId = search.id;
    client.searchStateId = search.state.id;

    const searchStateChanges = { machine: machine.id, output: [] };

    let searchState;
    try {
      const response = await updateSearchState(client.searchStateId, extendObj(searchStateChanges));
      searchState = response.searchState;
    } catch (err) {
      throw new Error(err.message);
    }

    this.notifySearchListeners(search.id, searchState, searchStateChanges);

    this.sendMessage(client.conn, 'startSearch', { project, search, resume });
  }

  async stopSearch(project, search, machine) {
    console.log('Stop search', project, search, machine);

    const connId = this.machines[machine.id];
    if (typeof connId === 'undefined') {
      // machine not found
      throw new Error('The requested machine is not connected.');
    }

    const client = this.clients[connId];

    this.sendMessage(client.conn, 'stopSearch', { searchId: search.id });
  }

  handleUserMessages(client, message) {
    if (message.topic === 'listenToSearch') {
      this.handleUserListenToSearch(client, message);
    } else if (message.topic === 'stopListeningToSearch') {
      this.handleUserStopListeningToSearch(client, message);
    }
  }

  async handleUserListenToSearch(client, message) {
    try {
      console.log('User requested listenToSearch');

      const detail = message.detail;
      if (typeof detail !== 'object' || detail === null) return;

      const searchId = detail.searchId;
      const lastUpdate = detail.lastUpdate;

      let search;
      try {
        search = await Search.findById(searchId).populate('state');
      } catch (err) {
        throw new Error(err.err);
      }
      if (!search) {
        throw new Error('The search does not exist.');
      }
      const searchState = search.state.toObject({ virtuals: true });

      if (!client.searchListeners) client.searchListeners = {};
      client.searchListeners[searchId] = { lastUpdate };

      const searchStateChanges = {
        ...searchState,
        output: searchState.output.filter((anOutput) => anOutput.timestamp > lastUpdate),
      };

      // send initial changes
      this.notifySearchListeners(search.id, searchState, searchStateChanges);
    } catch (err) {
      this.sendMessage(client.conn, 'listenToSearchError', { message: err.message });
    }
  }

  notifySearchListeners(searchId, searchState, searchStateChanges, type = 'extend') {
    console.log('notifySearchListeners', searchId);

    Object.assign(searchStateChanges, pick(searchState, 'created_at', 'updated_at'));

    // TODO: use more efficient way than looping over every client
    for (const client of Object.values(this.clients)) {
      const searchListener = client.searchListeners && client.searchListeners[searchId];
      if (searchListener) {
        console.log('Search listener candidate', searchListener.lastUpdate, searchState.updated_at);
        if (searchListener.lastUpdate < searchState.updated_at) {
          console.log('Sending search update to', client.connId);
          this.sendMessage(client.conn, 'searchStateChange', { searchId, searchStateChanges, type });
          searchListener.lastUpdate = searchState.updated_at;
        }
      }
    }
  }

  handleUserStopListeningToSearch(client, message) {
    console.log('User requested stopListeningToSearch');

    const detail = message.detail;
    if (typeof detail !== 'object' || detail === null) return;

    const searchId = detail.searchId;

    if (client.searchListeners) {
      delete client.searchListeners[searchId];
    }
  }

  sendMessage(conn, topic, detail = {}) {
    const message = { topic, detail, timestamp: Date.now() };
    const rawMessage = JSON.stringify(message);
    console.log('Sending: %s', rawMessage);
    conn.send(rawMessage);
  }

}
