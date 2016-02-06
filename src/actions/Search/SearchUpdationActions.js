import Globals from '../../core/Globals';

export default class SearchUpdationActions {

  reset() {
    return '';
  }

  updateSettings(settings) {
    return settings;
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

  updateName(name) {
    return name;
  }

  update(projectId, id, name, settings) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.saveSearch(projectId, id, name, settings, this.alt.req);
        this.actions.updateSuccess(response.search);
      } catch (err) {
        this.actions.updateError(err);
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
