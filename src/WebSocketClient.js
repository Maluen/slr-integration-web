import EventEmitter from 'node-event-emitter';

export default class WebSocketClient extends EventEmitter {

  constructor() {
    super();

    this.searchListeners = {}; // <searchId, callback>
  }

  start() {
    const promise = new Promise((resolve, reject) => {
      this.once('connected', resolve);
      this.once('disconnected', reject);
    });

    this.socket = new WebSocket(`ws://${location.hostname}:7667`);
    this.socket.onopen = this.onConnected.bind(this);
    this.socket.onclose = this.onDisconnected.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);

    return promise;
  }

  onConnected() {
    console.log('Connected!');
    this.emit('connected');
  }

  onDisconnected() {
    console.log('Disconnected.');
    this.emit('disconnected');
  }

  handleMessage(event) {
    const rawMessage = event.data;
    console.log('Message received', rawMessage);

    // Only accept objects
    let message;
    try {
      message = JSON.parse(rawMessage);
      if (typeof message !== 'object' || message === null) throw new Error();
    } catch (e) {
      console.log('Invalid message!');
      return;
    }

    if (message.topic === 'searchStateChange') {
      console.log('Received searchStateChange');
    }
  }

  listenToSearch(searchId, lastUpdate, callback) {
    console.log('listenToSearch', searchId);

    this.searchListeners[searchId] = callback;
    this.sendMessage('listenToSearch', { searchId, lastUpdate });
  }

  stopListeningToSearch(searchId) {
    console.log('stopListeningToSearch', searchId);

    delete this.searchListeners[searchId];
    this.sendMessage('stopListeningToSearch', { searchId });
  }

  sendMessage(topic, detail = {}) {
    const message = { type: 'user', topic, detail, timestamp: Date.now() };
    const rawMessage = JSON.stringify(message);
    console.log('Sending: %s', rawMessage);
    this.socket.send(rawMessage);
  }

}
