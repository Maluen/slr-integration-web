import ws from 'ws';
import authenticateMachineService from './server/services/Machine/authenticateMachine';
import SearchState from './server/models/SearchState';

function updateSearchState(id, updateFn) {
  return Promise.resolve().then(async () => {
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
      await searchState.save();
    } catch (err) {
      throw new Error(err.message);
    }

    return { searchState: searchState.toObject({ virtuals: true }) };
  });
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

      if (typeof client.machine !== 'undefined') {
        const machineId = client.machine.id;
        delete this.machines[machineId];
      }
      delete this.clients[connId];
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
      const response = await authenticateMachineService(machineId, machineName, machinePassword);
      machine = response.machine;
    } catch (err) {
      this.sendMessage(conn, 'loginError', { message: err.message });
      return;
    }

    this.sendMessage(conn, 'loginSuccess');

    this.clients[connId].machine = machine;
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

    try {
      await updateSearchState(client.search.state, extendObj({ status }));
    } catch (err) {
      this.sendMessage(conn, 'searchStatusError', { message: err.message });
    }

    // notify search users
  }

  async handleMachineOutputLine(client, message) {
    const { connId, conn } = client;

    //console.log('Machine sent output line');

    const timestamp = message.timestamp;

    const detail = message.detail;
    if (typeof detail !== 'object' || detail === null) return;

    const line = detail.line;

    try {
      await updateSearchState(client.search.state, (searchState) => {
        searchState.output.push({ line, timestamp });
        return searchState;
      });
    } catch (err) {
      this.sendMessage(conn, 'outputLineError', { message: err.message });
    }

    // notify search users
  }

  async startSearch(project, search, machine, resume) {
    console.log('Start search', project, search, machine);

    const connId = this.machines[machine.id];
    if (typeof connId === 'undefined') {
      // machine not found
      throw new Error('The requested machine is not connected.');
    }

    const client = this.clients[connId];
    const conn = client.conn;

    client.project = project;
    client.search = search;

    try {
      await updateSearchState(client.search.state, extendObj({ machine: machine.id, output: [] }));
    } catch (err) {
      throw new Error(err.message);
    }

    this.sendMessage(conn, 'startSearch', { project, search, resume });
  }

  handleUserMessages(client, message) {

  }

  sendMessage(conn, topic, detail = {}) {
    const message = { topic, detail, timestamp: Date.now() };
    const rawMessage = JSON.stringify(message);
    console.log('Sending: %s', rawMessage);
    conn.send(rawMessage);
  }

}
