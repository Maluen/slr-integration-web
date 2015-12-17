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
        console.log('fetch error', err);
      }
      resolve();
    });
  }

  fetchBefore() {
    return '';
  }


}
