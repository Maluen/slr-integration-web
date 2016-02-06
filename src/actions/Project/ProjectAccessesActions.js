import Globals from '../../core/Globals';

export default class ProjectAccessesActions {

  reset() {
    return '';
  }

  fetch(projectId) {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.readProjectAccesses(projectId, this.alt.req);
        const { project, projectAccesses } = response;
        this.actions.fetchSuccess({ project, projectAccesses });
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

  fetchSuccess(result) {
    return result;
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
