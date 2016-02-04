import Globals from '../../core/Globals';

export default class SearchCreationActions {

  updateName(name) {
    return name;
  }

  updateSettings(settings) {
    return settings;
  }

  create(projectId, name, settings) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.saveSearch(projectId, null, name, settings, this.alt.req);
        this.actions.createSuccess(response.search);
      } catch (err) {
        this.actions.createError(err.message);
      }
      resolve();
    });
  }

  createSuccess(search) {
    return (dispatch) => {
      dispatch(search);
      this.alt.redirect(`/searches/${search.project}`);
    };
  }

  createError(errorMessage) {
    return errorMessage;
  }

}
