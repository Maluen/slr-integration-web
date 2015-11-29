import EventEmitter from 'eventemitter3';
import appDispatcher from '../dispatcher/appDispatcher';
import Immutable from 'immutable';

const CHANGE_EVENT = 'change';

function registerHandlers(store) {
  const handlers = store.getHandlers();

  appDispatcher.register((action) => {
    const handler = handlers[action.type];
    if (handler) {
      const state = store.state;
      const newState = handler.call(store, state, action);
      store.state = newState;
      if (newState !== state) store.emitChange();
    }
  });
}

class Store {

  constructor() {
    this.EE = new EventEmitter();
    this.state = this.getInitialState();
    registerHandlers(this);
  }

  emitChange() {
    this.EE.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.EE.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.EE.removeListener(CHANGE_EVENT, callback);
  }

  // default impl.
  getInitialState() {
    return new Immutable.Map({});
  }

  // default impl.
  getHandlers() {
    return {};
  }

  // return the deeply cloned state as a plain javascript object
  exportState() {
    return this.state.toObject();
  }

}

export default Store;
