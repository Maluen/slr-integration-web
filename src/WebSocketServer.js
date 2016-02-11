import ws from 'ws';
import authenticateMachineService from './server/services/Machine/authenticateMachine';

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
    this.clients[connId] = { conn };
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

      this.handleMessage(connId, message);
    });

    conn.on('close', () => {
      console.log('Disconnected: %s', connId);

      if (typeof this.clients[connId].machine !== 'undefined') {
        const machineId = this.clients[connId].machine.id;
        delete this.machines[machineId];
      }
      delete this.clients[connId];
    });

    // DEBUG
    //conn.send('{"user": "server"}');
  }

  handleMessage(connId, message) {
    if (message.type === 'machine') {
      this.handleMachineMessages(connId, message);
    } else if (message.type === 'user') {
      this.handleUserMessages(connId, message);
    }
  }

  async handleMachineMessages(connId, message) {
    const conn = this.clients[connId].conn;

    if (message.topic === 'login') {
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
      //this.startSearch({ id: 'TODO_PROJECT' }, { id: 'TODO_SEARCH' }, { id: 'TODO' });
    }
  }

  startSearch(project, search, machine) {
    console.log('Start search', project, search, machine);

    const connId = this.machines[machine.id];
    if (typeof connId === 'undefined') {
      // machine not found
      throw new Error('The requested machine is not connected.');
    }

    const conn = this.clients[connId].conn;
    this.sendMessage(conn, 'startSearch', { project, search });
  }

  handleUserMessages(connId, message) {

  }

  sendMessage(conn, topic, detail = {}) {
    const message = { topic, detail };
    const rawMessage = JSON.stringify(message);
    console.log('Sending: %s', rawMessage);
    conn.send(rawMessage);
  }

}
