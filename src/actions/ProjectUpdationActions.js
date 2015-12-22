import Globals from '../core/Globals';

export default class ProjectUpdationActions {

  reset() {
    return '';
  }

  fetch(id) {
    return this.alt.promise(async (resolve) => {
      try {
        this.actions.fetchBefore();
        const response = await Globals.services.readProjects({ id }, this.alt.req);
        const project = response.projects ? response.projects[0] : null;
        this.dispatch(project);
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

  update(id, name) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.saveProject(id, name, this.alt.req);
        this.actions.updateSuccess(response.project);
      } catch (err) {
        this.actions.updateError(err);
      }
      resolve();
    });
  }

  updateSuccess(project) {
    return (dispatch) => {
      dispatch(project);
      this.alt.redirect('/projects');
    };
  }

  updateError(errorMessage) {
    return errorMessage;
  }

}
