import Globals from '../../core/Globals';

export default class ProjectCreationActions {

  updateName(name) {
    return name;
  }

  updateSettings(settings) {
    return settings;
  }

  create(name, settings) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.post('saveProject', { id: null, name, settings, req: this.alt.req });
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
