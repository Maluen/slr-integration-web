import Alt from 'alt';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import AccountActions from './actions/AccountActions';
import AccountStore from './stores/AccountStore';

class Flux extends Alt {

  constructor(...args) {
    super(...args);

    this.promises = [];

    this.addActions('accountActions', AccountActions);
    this.addStore('accountStore', AccountStore);
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
