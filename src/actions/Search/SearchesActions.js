import Globals from '../../core/Globals';

export default class SearchesActions {

  reset() {
    return '';
  }

  fetch(projectId) {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.readSearches(projectId, null, this.alt.req);
        this.actions.fetchSuccess(response.searches);
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

  fetchSuccess(searches) {
    return searches;
  }

  deleteSearch(id) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.deleteSearch(id, this.alt.req);
        this.dispatch(response.search);
      } catch (err) {
        // TODO
        console.log('deleteSearch error', err.message);
      }
      resolve();
    });
  }

}
