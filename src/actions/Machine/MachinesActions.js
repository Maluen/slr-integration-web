import Globals from '../../core/Globals';

export default class MachinesActions {

  fetch() {
    return this.alt.promise(async (resolve) => {
      try {
        this.actions.fetchBefore();
        const response = await Globals.services.readMachines(null, this.alt.req);
        this.dispatch(response.machines);
      } catch (err) {
        // no-op
        console.log('fetch error', err.message);
      }
      resolve();
    });
  }

  fetchBefore() {
    return '';
  }

  deleteMachine(id) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.deleteMachine(id, this.alt.req);
        this.dispatch(response.machine);
      } catch (err) {
        // TODO
        console.log('deleteMachine error', err.message);
      }
      resolve();
    });
  }

}
