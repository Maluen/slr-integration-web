import Globals from '../../core/Globals';

export default class SearchActions {

  reset() {
    return '';
  }

  fetch(projectId, id) {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.get('readSearches', { projectId, filterObj: { id }, req: this.alt.req });
        const { searches, project } = response;
        const search = searches ? searches[0] : null;
        this.actions.fetchSuccess({ search, project });
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

  selectMachine(machineId) {
    return machineId;
  }

  startSearch(projectId, id, machineId, resume) {
    return this.alt.promise(async (resolve) => {
      try {
        await Globals.services.post('startSearch', { projectId, id, machineId, resume, req: this.alt.req });
        this.actions.startSearchSuccess();
      } catch (err) {
        this.actions.startSearchError(err.message);
      }
      resolve();
    });
  }

  startSearchError(errorMessage) {
    console.log('startSearch error', errorMessage);
    return errorMessage;
  }

  startSearchSuccess() {
    return '';
  }

  stopSearch(projectId, id, machineId) {
    return this.alt.promise(async (resolve) => {
      try {
        await Globals.services.post('stopSearch', { projectId, id, machineId, req: this.alt.req });
        this.actions.stopSearchSuccess();
      } catch (err) {
        this.actions.stopSearchError(err.message);
      }
      resolve();
    });
  }

  stopSearchError(errorMessage) {
    console.log('stopSearchError error', errorMessage);
    return errorMessage;
  }

  stopSearchSuccess() {
    return '';
  }

  extendSearchState(searchStateChanges, type) {
    return { searchStateChanges, type };
  }

  resetSearchStateStatus() {
    return '';
  }

}
