import Globals from '../../core/Globals';

export default class SearchesActions {

  reset() {
    return '';
  }

  fetch(projectId) {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.get('readSearches', { projectId, id: null, req: this.alt.req });
        const { searches, project } = response;
        this.actions.fetchSuccess({ searches, project });
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

  deleteSearch(id) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.post('deleteSearch', { id, req: this.alt.req });
        this.dispatch(response.search);
      } catch (err) {
        // TODO
        console.log('deleteSearch error', err.message);
      }
      resolve();
    });
  }

}
