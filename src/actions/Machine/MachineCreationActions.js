import Globals from '../../core/Globals';

export default class MachineCreationActions {

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

  create(name, password, hostname, port) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.post('saveMachine', { id: null, name, password, hostname, port, req: this.alt.req });
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
