import ws from 'ws';
import authenticateMachineService from './server/services/Machine/authenticateMachine';
import Search from './server/models/Search';

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
    } else if (message.topic === 'searchState') {
      this.handleMachineSearchState(client, message);
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

  async handleMachineSearchState(client, message) {
    const { connId, conn } = client;

    console.log('Machine search state changed');

    const detail = message.detail;
    if (typeof detail !== 'object' || detail === null) return;

    const searchState = detail.state;

    const allowedStates = ['running', 'success', 'failure'];
    if (allowedStates.indexOf(searchState) === -1) {
      this.sendMessage(conn, 'searchStateError', { message: 'Invalid state' });
      return;
    }

    let search;
    try {
      search = await Search.findById(client.search.id);
    } catch (err) {
      this.sendMessage(conn, 'searchStateError', { message: err.err });
      return;
    }
    if (!search) {
      // the search was deleted while it was running!
      this.sendMessage(conn, 'searchStateError', { message: 'The search does not exist anymore.' });
      return;
    }

    search.state = searchState;

    try {
      await search.save();
    } catch (err) {
      this.sendMessage(conn, 'searchStateError', { message: err.err });
      return;
    }

    // notify search users
  }

  startSearch(project, search, machine, resume) {
    console.log('Start search', project, search, machine);

    const connId = this.machines[machine.id];
    if (typeof connId === 'undefined') {
      // machine not found
      throw new Error('The requested machine is not connected.');
    }

    const client = this.clients[connId];

    client.project = project;
    client.search = search;

    const conn = client.conn;
    this.sendMessage(conn, 'startSearch', { project, search, resume });
  }

  handleUserMessages(client, message) {

  }

  sendMessage(conn, topic, detail = {}) {
    const message = { topic, detail };
    const rawMessage = JSON.stringify(message);
    console.log('Sending: %s', rawMessage);
    conn.send(rawMessage);
  }

}
