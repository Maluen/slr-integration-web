import Alt from 'alt';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Location from './core/Location';

import AccountActions from './actions/AccountActions';
import AccountStore from './stores/AccountStore';

import MachineCreationActions from './actions/Machine/MachineCreationActions';
import MachineCreationStore from './stores/Machine/MachineCreationStore';
import MachineUpdationActions from './actions/Machine/MachineUpdationActions';
import MachineUpdationStore from './stores/Machine/MachineUpdationStore';
import MachinesActions from './actions/Machine/MachinesActions';
import MachinesStore from './stores/Machine/MachinesStore';
import MachineAccessesActions from './actions/Machine/MachineAccessesActions';
import MachineAccessesStore from './stores/Machine/MachineAccessesStore';
import MachineAccessCreationActions from './actions/Machine/MachineAccessCreationActions';
import MachineAccessCreationStore from './stores/Machine/MachineAccessCreationStore';

import ProjectCreationActions from './actions/Project/ProjectCreationActions';
import ProjectCreationStore from './stores/Project/ProjectCreationStore';
import ProjectUpdationActions from './actions/Project/ProjectUpdationActions';
import ProjectUpdationStore from './stores/Project/ProjectUpdationStore';
import ProjectsActions from './actions/Project/ProjectsActions';
import ProjectsStore from './stores/Project/ProjectsStore';
import ProjectAccessesActions from './actions/Project/ProjectAccessesActions';
import ProjectAccessesStore from './stores/Project/ProjectAccessesStore';
import ProjectAccessCreationActions from './actions/Project/ProjectAccessCreationActions';
import ProjectAccessCreationStore from './stores/Project/ProjectAccessCreationStore';

import SearchCreationActions from './actions/Search/SearchCreationActions';
import SearchCreationStore from './stores/Search/SearchCreationStore';
import SearchUpdationActions from './actions/Search/SearchUpdationActions';
import SearchUpdationStore from './stores/Search/SearchUpdationStore';
import SearchesActions from './actions/Search/SearchesActions';
import SearchesStore from './stores/Search/SearchesStore';

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

    this.addActions('machineAccessCreationActions', MachineAccessCreationActions);
    this.addStore('machineAccessCreationStore', MachineAccessCreationStore);

    this.addActions('projectCreationActions', ProjectCreationActions);
    this.addStore('projectCreationStore', ProjectCreationStore);

    this.addActions('projectUpdationActions', ProjectUpdationActions);
    this.addStore('projectUpdationStore', ProjectUpdationStore);

    this.addActions('projectsActions', ProjectsActions);
    this.addStore('projectsStore', ProjectsStore);

    this.addActions('projectAccessesActions', ProjectAccessesActions);
    this.addStore('projectAccessesStore', ProjectAccessesStore);

    this.addActions('projectAccessCreationActions', ProjectAccessCreationActions);
    this.addStore('projectAccessCreationStore', ProjectAccessCreationStore);

    this.addActions('searchCreationActions', SearchCreationActions);
    this.addStore('searchCreationStore', SearchCreationStore);

    this.addActions('searchUpdationActions', SearchUpdationActions);
    this.addStore('searchUpdationStore', SearchUpdationStore);

    this.addActions('searchesActions', SearchesActions);
    this.addStore('searchesStore', SearchesStore);
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
