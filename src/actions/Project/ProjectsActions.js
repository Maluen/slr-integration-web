import Globals from '../../core/Globals';

export default class ProjectsActions {

  reset() {
    return '';
  }

  fetch() {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.readProjects(null, this.alt.req);
        this.actions.fetchSuccess(response.projects);
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

  fetchSuccess(projects) {
    return projects;
  }

  deleteProject(id) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.deleteProject(id, this.alt.req);
        this.dispatch(response.project);
      } catch (err) {
        // TODO
        console.log('deleteProject error', err.message);
      }
      resolve();
    });
  }

}
