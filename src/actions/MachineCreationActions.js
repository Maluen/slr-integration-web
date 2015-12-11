import Globals from '../core/Globals';

class MachineCreationActions {

  updateHostname(hostname) {
    return hostname;
  }

  updatePort(port) {
    return port;
  }

  create(hostname, port) {
    return this.alt.promise(async (resolve) => {
      try {
        await Globals.services.createMachine(hostname, port, this.alt.req);
        this.actions.createSuccess();
      } catch (err) {
        this.actions.createError(err);
      }
      resolve();
    });
  }

  createSuccess() {
    return (dispatch) => {
      dispatch();
      this.alt.redirect('/machines');
    };
  }

  createError(errorMessage) {
    return errorMessage;
  }

}

export default MachineCreationActions;
