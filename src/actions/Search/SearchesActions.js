import Globals from '../../core/Globals';

export default class SearchesActions {

  reset() {
    return '';
  }

  fetch(projectId) {
    return this.alt.promise(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.readSearches(projectId, null, this.alt.req);
        this.dispatch(response.searches);
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
