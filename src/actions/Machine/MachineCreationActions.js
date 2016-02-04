import Globals from '../../core/Globals';

export default class MachineCreationActions {

  updateName(name) {
    return name;
  }

  updateHostname(hostname) {
    return hostname;
  }

  updatePort(port) {
    return port;
  }

  create(name, hostname, port) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.saveMachine(null, name, hostname, port, this.alt.req);
        this.actions.createSuccess(response.machine);
      } catch (err) {
        this.actions.createError(err.message);
      }
      resolve();
    });
  }

  createSuccess(machine) {
    return (dispatch) => {
      dispatch(machine);
      this.alt.redirect('/machines');
    };
  }

  createError(errorMessage) {
    return errorMessage;
  }

}
