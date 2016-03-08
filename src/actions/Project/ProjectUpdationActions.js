import Globals from '../../core/Globals';

export default class ProjectUpdationActions {

  reset() {
    return '';
  }

  fetch(id) {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.get('readProjects', { filterObj: { id }, req: this.alt.req });
        const project = response.projects ? response.projects[0] : null;
        this.actions.fetchSuccess(project);
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

  fetchSuccess(project) {
    return project;
  }

  updateName(name) {
    return name;
  }

  updateSettings(settings) {
    return settings;
  }

  update(id, name, settings) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.post('saveProject', { id, name, settings, req: this.alt.req });
        this.actions.updateSuccess(response.project);
      } catch (err) {
        this.actions.updateError(err.message);
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
