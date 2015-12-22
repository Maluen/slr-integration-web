import ProjectAccess from '../models/ProjectAccess';
import currentUserService from './currentUser';

export default function saveProjectAccess(projectId, userId, permission, options = {}, req) {
  return Promise.resolve().then(async () => {
    // TODO: validation

    let currentUser = null;
    try {
      const response = await currentUserService(req);
      currentUser = response.user;
      if (!currentUser) {
        throw new Error('Access denied: you must be logged-in.');
      }
    } catch (err) {
      throw err;
    }

    if (!projectId) {
      throw new Error(`The 'projectId' query parameter cannot be empty.`);
    }

    if (!userId) {
      throw new Error(`The 'userId' query parameter cannot be empty.`);
    }

    if (permission !== 'Administrator') { // (only available permission for now)
      throw new Error('Invalid permission.');
    }

    if (!options.isAfterCreate) {
      // current user must have Administrator access
      // to this project to add another user
      try {
        const count = await ProjectAccess.count({
          project: projectId,
          user: currentUser._id,
          permission: 'Administrator',
        });
        if (count === 0) {
          throw new Error('Access denied: you must be an Administrator of this project to add users to it.');
        }
      } catch (err) {
        throw new Error(err.err);
      }
    } else {
      if (permission !== 'Administrator') {
        throw new Error({ error: 'Project creator can only be an Administrator.' });
      }
    }

    // check if user already has access to this project (with any permission)
    // update permission in such a case, create otherwise

    let projectAccess;
    try {
      projectAccess = await ProjectAccess.findOne({
        project: projectId,
        user: userId,
      });
    } catch (err) {
      throw new Error(err.err);
    }

    if (projectAccess) {
      // update access
      if (projectAccess.user.equals(currentUser._id)) {
        throw new Error('You can\'t change your own permission.');
      }
      // update permission
      projectAccess.permission = permission;
    } else {
      // create access
      projectAccess = new ProjectAccess({ project: projectId, user: userId, permission });
    }

    try {
      await projectAccess.save();
    } catch (err) {
      throw new Error(err.err);
    }

    return { projectAccess: projectAccess.toObject({ virtuals: true }) };
  });
}
