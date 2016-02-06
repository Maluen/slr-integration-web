import Globals from '../../core/Globals';

export default class ProjectAccessesActions {

  reset() {
    return '';
  }

  fetch(projectId) {
    return this.alt.promise(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.readProjectAccesses(projectId, this.alt.req);
        const { project, projectAccesses } = response;
        this.dispatch({ project, projectAccesses });
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

  deleteProjectAccess(id) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.deleteProjectAccess(id, this.alt.req);
        this.dispatch(response.projectAccess);
      } catch (err) {
        // TODO
        console.log('deleteProjectAccess error', err.message);
      }
      resolve();
    });
  }


}
