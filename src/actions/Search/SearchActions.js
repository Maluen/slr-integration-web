import Globals from '../../core/Globals';

export default class SearchActions {

  reset() {
    return '';
  }

  fetch(projectId, id) {
    return this.alt.promise(async (resolve) => {
      try {
        this.actions.fetchBefore();
        const response = await Globals.services.readSearches(projectId, { id }, this.alt.req);
        const search = response.searches ? response.searches[0] : null;
        this.dispatch(search);
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

}
