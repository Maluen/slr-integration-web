import Globals from '../../core/Globals';

export default class SearchUpdationActions {

  reset() {
    return '';
  }

  fetch(projectId, id) {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.get('readSearches', { projectId, filterObj: { id }, req: this.alt.req });
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

  updateName(name) {
    return name;
  }

  updateSettings(settings) {
    return settings;
  }

  update(projectId, id, name, settings) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.post('saveSearch', { projectId, id, name, settings, req: this.alt.req });
        this.actions.updateSuccess(response.search);
      } catch (err) {
        this.actions.updateError(err.message);
      }
      resolve();
    });
  }

  updateSuccess(search) {
    return (dispatch) => {
      dispatch(search);
      this.alt.redirect(`/searches/${search.project}`);
    };
  }

  updateError(errorMessage) {
    return errorMessage;
  }

}
