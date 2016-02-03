import Globals from '../../core/Globals';

export default class SearchCreationActions {

  updateName(name) {
    return name;
  }

  create(projectId, name) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.saveSearch(projectId, null, name, this.alt.req);
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
