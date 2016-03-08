import ProjectAccess from '../../models/ProjectAccess';
import Project from '../../models/Project';

import authenticated from '../middlewares/authenticated';

export const readProjectAccesses = {
  method: 'get',
  remote: true,
  parameters: {
    projectId: String,
  },
  handler: [authenticated, ({ projectId, req, currentUser }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      if (!projectId) {
        throw new Error(`The 'projectId' query parameter cannot be empty.`);
      }

      const projectAccessCount = await ProjectAccess.count({
        project: projectId,
        user: currentUser._id,
      });
      if (projectAccessCount === 0) {
        throw new Error('Access denied: you must have access to this project (with any permission) to view its users.');
      }

      const projectAccessList = await ProjectAccess.find({
        project: projectId,
      }).populate('user');

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
  }],
};

/*
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

    const projectAccessCount = await ProjectAccess.count({
      project: projectId,
      user: currentUser._id,
    });
    if (projectAccessCount === 0) {
      throw new Error('Access denied: you must have access to this project (with any permission) to view its users.');
    }

    const projectAccessList = await ProjectAccess.find({
      project: projectId,
    }).populate('user');

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
  })
  .catch(err => {
    throw new Error(typeof err === 'object' ? (err.message || err.err) : err);
  });
}
*/