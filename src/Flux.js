import Alt from 'alt';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Location from './core/Location';
import AccountActions from './actions/AccountActions';
import MachineCreationActions from './actions/MachineCreationActions';
import AccountStore from './stores/AccountStore';
import MachineCreationStore from './stores/MachineCreationStore';

class Flux extends Alt {

  constructor(req = null, res = null) {
    super();

    // server only
    this.req = req;
    this.res = res;

    this.promises = [];
    this.location = null;

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

  redirect(location) {
    if (!canUseDOM) {
      this.location = location;
    } else {
      Location.push(location);
    }
  }

}

export default Flux;
