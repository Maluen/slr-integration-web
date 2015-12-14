import Globals from '../core/Globals';

export default class MachineCreationActions {

  updateHostname(hostname) {
    return hostname;
  }

  updatePort(port) {
    return port;
  }

  create(hostname, port) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.saveMachine(null, hostname, port, this.alt.req);
        this.actions.createSuccess(response.machine);
      } catch (err) {
        this.actions.createError(err);
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
