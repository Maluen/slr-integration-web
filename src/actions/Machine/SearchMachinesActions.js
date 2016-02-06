import Globals from '../../core/Globals';

export default class SearchMachinesActions {

  reset() {
    return '';
  }

  fetch(searchId) {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.readSearchMachines(searchId, this.alt.req);
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
