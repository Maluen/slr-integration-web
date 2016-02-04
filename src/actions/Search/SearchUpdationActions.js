import Globals from '../../core/Globals';

export default class SearchUpdationActions {

  reset() {
    return '';
  }

  updateSettings(settings) {
    return settings;
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
        console.log('fetch error', err);
      }
      resolve();
    });
  }

  fetchBefore() {
    return '';
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
