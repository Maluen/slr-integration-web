import Globals from '../../core/Globals';

export default class MachineAccessesActions {

  reset() {
    return '';
  }

  fetch(machineId) {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.get('readMachineAccesses', { machineId, req: this.alt.req });
        const { machine, machineAccesses } = response;
        this.actions.fetchSuccess({ machine, machineAccesses });
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

  fetchSuccess(result) {
    return result;
  }

  deleteMachineAccess(id) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.post('deleteMachineAccess', { id, req: this.alt.req });
        this.dispatch(response.machineAccess);
      } catch (err) {
        // TODO
        console.log('deleteMachineAccess error', err.message);
      }
      resolve();
    });
  }


}
