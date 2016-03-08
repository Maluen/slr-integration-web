import Globals from '../../core/Globals';

export default class ProjectAccessCreationActions {

  updateEmail(email) {
    return email;
  }

  updatePermission(permission) {
    return permission;
  }

  create(projectId, email, permission) {
    return this.alt.promise(async (resolve) => {
      try {
        const readUsersResponse = await Globals.services.get('readUsers', { filterObj: { email } });
        const users = readUsersResponse.users;
        if (!users || users.length === 0) {
          throw new Error('User not found.');
        }
        const userId = users[0].id;

        const response = await Globals.services.post('saveProjectAccess', { projectId, userId, permission, req: this.alt.req });
        this.actions.createSuccess(response.projectAccess);
      } catch (err) {
        this.actions.createError(err.message);
      }
      resolve();
    });
  }

  createSuccess(projectAccess) {
    return (dispatch) => {
      dispatch(projectAccess);
      this.alt.redirect(`/projectAccesses/${projectAccess.project}`);
    };
  }

  createError(errorMessage) {
    return errorMessage;
  }

}
