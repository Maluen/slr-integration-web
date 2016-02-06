import Globals from '../../core/Globals';

export default class MachineUpdationActions {

  reset() {
    return '';
  }

  fetch(id) {
    return this.alt.promise(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.readMachines({ id }, this.alt.req);
        const machine = response.machines ? response.machines[0] : null;
        this.dispatch(machine);
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

  updateHostname(hostname) {
    return hostname;
  }

  updatePort(port) {
    return port;
  }

  update(id, name, hostname, port) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.saveMachine(id, name, hostname, port, this.alt.req);
        this.actions.updateSuccess(response.machine);
      } catch (err) {
        this.actions.updateError(err);
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
