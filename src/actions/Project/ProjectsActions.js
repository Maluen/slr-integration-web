import Globals from '../../core/Globals';

export default class ProjectsActions {

  fetch() {
    return this.alt.promise(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.readProjects(null, this.alt.req);
        this.dispatch(response.projects);
      } catch (err) {
        // no-op
        console.log('fetch error', err.message);
      }
      resolve();
    });
  }

  fetchBefore() {
    return '';
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
