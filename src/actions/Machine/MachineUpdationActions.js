import Globals from '../../core/Globals';

export default class MachineUpdationActions {

  reset() {
    return '';
  }

  fetch(id) {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.readMachines({ id }, this.alt.req);
        const machine = response.machines ? response.machines[0] : null;
        this.actions.fetchSuccess(machine);
      } catch (err) {
        this.actions.fetchError(err.message);
      }
      resolve();
    });
  }

  fetchError(errorMessage) {
    console.log('fetch error', errorMessage);
    return errorMessage;
  }

  fetchSuccess(machine) {
    return machine;
  }

  fetchBefore() {
    return '';
  }

  updateName(name) {
    return name;
  }

  updatePassword(password) {
    return password;
  }

  updateHostname(hostname) {
    return hostname;
  }

  updatePort(port) {
    return port;
  }

  update(id, name, password, hostname, port) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.saveMachine(id, name, password, hostname, port, this.alt.req);
        this.actions.updateSuccess(response.machine);
      } catch (err) {
        this.actions.updateError(err.message);
      }
      resolve();
    });
  }

  updateSuccess(machine) {
    return (dispatch) => {
      dispatch(machine);
      this.alt.redirect('/machines');
    };
  }

  updateError(errorMessage) {
    return errorMessage;
  }

}
