import ws from 'ws';
import url from 'url';

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

  handleMachineMessages(connId, message) {
    if (message.topic === 'login') {
      console.log('Machine requested login');

      const detail = message.detail;
      if (typeof detail !== 'object' || detail === null) return;

      const machineName = message.name;
      const machinePassword = message.password;

      // TODO: authenticate
      const machine = { id: '56bc5291afc769d42517fc55' };

      this.clients[connId].machine = machine;
      this.machines[machine.id] = connId;

      // DEBUG
      //this.startSearch({ id: 'TODO_PROJECT' }, { id: 'TODO_SEARCH' }, { id: 'TODO' });
    }
  }

  startSearch(project, search, machine) {
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
    conn.send(JSON.stringify(message));
  }

}
