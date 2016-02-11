import Globals from '../../core/Globals';

export default class SearchActions {

  reset() {
    return '';
  }

  fetch(projectId, id) {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.readSearches(projectId, { id }, this.alt.req);
        const search = response.searches ? response.searches[0] : null;
        this.actions.fetchSuccess(search);
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

  fetchSuccess(search) {
    return search;
  }

  selectMachine(machineId) {
    return machineId;
  }

  startSearch(projectId, id, machineId) {
    return this.alt.promise(async (resolve) => {
      try {
        await Globals.services.startSearch(projectId, id, machineId, this.alt.req);
      } catch (err) {
        // TODO
        console.log('startSearch error', err.message);
      }
      resolve();
    });
  }

}
