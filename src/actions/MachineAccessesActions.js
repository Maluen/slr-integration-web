import Globals from '../core/Globals';

export default class MachineAccessesActions {

  reset() {
    return '';
  }

  fetch(machineId) {
    return this.alt.promise(async (resolve) => {
      try {
        this.actions.fetchBefore();
        const response = await Globals.services.readMachineAccesses(machineId, this.alt.req);
        const { machine, machineAccesses } = response;
        this.dispatch({ machine, machineAccesses });
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

  deleteMachineAccess(id) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.deleteMachineAccess(id, this.alt.req);
        this.dispatch(response.machineAccess);
      } catch (err) {
        // TODO
        console.log('deleteMachineAccess error', err.message);
      }
      resolve();
    });
  }


}
