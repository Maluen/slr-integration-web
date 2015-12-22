import Globals from '../core/Globals';

export default class ProjectCreationActions {

  updateName(name) {
    return name;
  }

  create(name) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.saveProject(null, name, this.alt.req);
        this.actions.createSuccess(response.project);
      } catch (err) {
        this.actions.createError(err.message);
      }
      resolve();
    });
  }

  createSuccess(project) {
    return (dispatch) => {
      dispatch(project);
      this.alt.redirect('/projects');
    };
  }

  createError(errorMessage) {
    return errorMessage;
  }

}
