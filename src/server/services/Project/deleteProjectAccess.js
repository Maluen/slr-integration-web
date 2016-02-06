import ProjectAccess from '../../models/ProjectAccess';
import currentUserService from '../User/currentUser';

export default function deleteProjectAccess(id, req) {
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

    if (!id) {
      throw new Error(`The 'id' query parameter cannot be empty.`);
    }

    const projectAccess = await ProjectAccess.findById(id);

    if (!projectAccess) {
      throw new Error('The requested project access does not exists.');
    }

    try {
      const count = await ProjectAccess.count({
        project: projectAccess.project,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (count === 0) {
        throw new Error('Access denied: you must be an Administrator of this project to remove access.');
      }
    } catch (err) {
      throw new Error(err.err);
    }

    if (projectAccess.user.equals(currentUser._id)) {
      throw new Error('You can\'t remove your own access.');
    }

    try {
      await projectAccess.remove();
    } catch (err) {
      throw new Error(err.err);
    }

    return { projectAccess: projectAccess.toObject({ virtuals: true }) };
  });
}
