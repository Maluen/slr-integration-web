import Globals from '../../core/Globals';

export default class MachineAccessCreationActions {

  updateEmail(email) {
    return email;
  }

  updatePermission(permission) {
    return permission;
  }

  create(machineId, email, permission) {
    return this.alt.promise(async (resolve) => {
      try {
        const readUsersResponse = await Globals.services.get('readUsers', { filterObj: { email } });
        const users = readUsersResponse.users;
        if (!users || users.length === 0) {
          throw new Error('User not found.');
        }
        const userId = users[0].id;

        const response = await Globals.services.post('saveMachineAccess', { machineId, userId, permission, req: this.alt.req });
        this.actions.createSuccess(response.machineAccess);
      } catch (err) {
        this.actions.createError(err.message);
      }
      resolve();
    });
  }

  createSuccess(machineAccess) {
    return (dispatch) => {
      dispatch(machineAccess);
      this.alt.redirect(`/machineAccesses/${machineAccess.machine}`);
    };
  }

  createError(errorMessage) {
    return errorMessage;
  }

}
