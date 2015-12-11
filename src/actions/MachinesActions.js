import Globals from '../core/Globals';

export default class MachinesActions {

  fetch() {
    return this.alt.promise(async (resolve) => {
      try {
        this.actions.fetchBefore();
        const response = await Globals.services.readMachines(this.alt.req);
        this.dispatch(response.machines);
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
