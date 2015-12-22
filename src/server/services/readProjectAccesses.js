import ProjectAccess from '../models/ProjectAccess';
import Project from '../models/Project';
import currentUserService from './currentUser';

export default function readProjectAccesses(projectId, req) {
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

    try {
      const count = await ProjectAccess.count({
        project: projectId,
        user: currentUser._id,
      });
      if (count === 0) {
        throw new Error('Access denied: you must have access to this project (with any permission) to view its users.');
      }
    } catch (err) {
      throw new Error(err.err);
    }

    let projectAccessList = [];
    try {
      projectAccessList = await ProjectAccess.find({
        project: projectId,
      }).populate('user');
    } catch (err) {
      throw new Error(err.err);
    }

    const project = projectAccessList.length ? await Project.findById(projectAccessList[0].project) : undefined;
    // TODO: rename to projectUsers
    const projectAccesses = projectAccessList.map(projectAccess => {
      return {
        id: projectAccess.id,
        user: projectAccess.user.toObject({ virtuals: true }),
        permission: projectAccess.permission,
      };
    });

    return { project: project.toObject({ virtuals: true }), projectAccesses };
  });
}
