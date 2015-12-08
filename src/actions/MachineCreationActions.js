import Globals from '../core/Globals';
import Location from '../core/Location';

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
        const response = await Globals.services.createMachine(hostname, port);
        this.actions.createSuccess();
      } catch (err) {
        this.actions.createError(err.response.body.error);
      }
    });
  }

  createSuccess() {
    return (dispatch) => {
      dispatch();
      Location.push('/machines');
    };
  }

  createError(errorMessage) {
    return errorMessage;
  }

}

export default MachineCreationActions;
