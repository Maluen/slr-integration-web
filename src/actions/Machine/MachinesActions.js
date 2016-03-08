import Globals from '../../core/Globals';

export default class MachinesActions {

  reset() {
    return '';
  }

  fetch() {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.get('readMachines', { filterObj: null, req: this.alt.req });
        this.actions.fetchSuccess(response.machines);
      } catch (err) {
        this.actions.fetchError(err.message);
      }
      resolve();
    });
  }

  fetchBefore() {
    return '';
  }

  fetchError(errorMessage) {
    console.log('fetch error', errorMessage);
    return errorMessage;
  }

  fetchSuccess(machines) {
    return machines;
  }

  deleteMachine(id) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.post('deleteMachine', { id, req: this.alt.req });
        this.dispatch(response.machine);
      } catch (err) {
        // TODO
        console.log('deleteMachine error', err.message);
      }
      resolve();
    });
  }

}
