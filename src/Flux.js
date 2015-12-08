import Alt from 'alt';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import AccountActions from './actions/AccountActions';
import MachineCreationActions from './actions/MachineCreationActions';
import AccountStore from './stores/AccountStore';
import MachineCreationStore from './stores/MachineCreationStore';

class Flux extends Alt {

  constructor(...args) {
    super(...args);

    this.promises = [];

    this.addActions('accountActions', AccountActions);
    this.addActions('machineCreationActions', MachineCreationActions);

    this.addStore('accountStore', AccountStore);
    this.addStore('machineCreationStore', MachineCreationStore);
  }

  promise(fn) {
    let promise = new Promise(fn);
    if (!canUseDOM) {
      promise = promise.then(() => {
        this.promises = this.promises.filter(aPromise => aPromise !== promise);
      });
      this.promises = [...this.promises, promise];
    }
    return promise;
  }

}

export default Flux;
