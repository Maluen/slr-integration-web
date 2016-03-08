import Globals from '../../core/Globals';

export default class SearchMachinesActions {

  reset() {
    return '';
  }

  fetch(searchId) {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.get('readSearchMachines', { searchId, req: this.alt.req });
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

}
