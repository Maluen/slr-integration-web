import Alt from 'alt';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Location from './core/Location';
import AccountActions from './actions/AccountActions';
import AccountStore from './stores/AccountStore';
import MachineCreationActions from './actions/MachineCreationActions';
import MachineCreationStore from './stores/MachineCreationStore';
import MachineUpdationActions from './actions/MachineUpdationActions';
import MachineUpdationStore from './stores/MachineUpdationStore';
import MachinesActions from './actions/MachinesActions';
import MachinesStore from './stores/MachinesStore';
import MachineAccessesActions from './actions/MachineAccessesActions';
import MachineAccessesStore from './stores/MachineAccessesStore';

class Flux extends Alt {

  constructor(req = null, res = null) {
    super();

    // server only
    this.req = req;
    this.res = res;

    this.promises = [];
    this.location = null;

    this.addActions('accountActions', AccountActions);
    this.addStore('accountStore', AccountStore);

    this.addActions('machineCreationActions', MachineCreationActions);
    this.addStore('machineCreationStore', MachineCreationStore);

    this.addActions('machineUpdationActions', MachineUpdationActions);
    this.addStore('machineUpdationStore', MachineUpdationStore);

    this.addActions('machinesActions', MachinesActions);
    this.addStore('machinesStore', MachinesStore);

    this.addActions('machineAccessesActions', MachineAccessesActions);
    this.addStore('machineAccessesStore', MachineAccessesStore);
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
