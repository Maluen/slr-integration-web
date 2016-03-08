import ProjectAccess from '../../models/ProjectAccess';

import authenticated from '../middlewares/authenticated';

export const deleteProjectAccess = {
  method: 'post',
  remote: true,
  parameters: {
    id: String,
  },
  handler: [authenticated, ({ id, req, currentUser }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      if (!id) {
        throw new Error(`The 'id' query parameter cannot be empty.`);
      }

      const projectAccess = await ProjectAccess.findById(id);

      if (!projectAccess) {
        throw new Error('The requested project access does not exists.');
      }

      const projectAccessCount = await ProjectAccess.count({
        project: projectAccess.project,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (projectAccessCount === 0) {
        throw new Error('Access denied: you must be an Administrator of this project to remove access.');
      }

      if (projectAccess.user.equals(currentUser._id)) {
        throw new Error('You can\'t remove your own access.');
      }

      await projectAccess.remove();

      return { projectAccess: projectAccess.toObject({ virtuals: true }) };
    });
  }],
};

/*
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

    const projectAccessCount = await ProjectAccess.count({
      project: projectAccess.project,
      user: currentUser._id,
      permission: 'Administrator',
    });
    if (projectAccessCount === 0) {
      throw new Error('Access denied: you must be an Administrator of this project to remove access.');
    }

    if (projectAccess.user.equals(currentUser._id)) {
      throw new Error('You can\'t remove your own access.');
    }

    await projectAccess.remove();

    return { projectAccess: projectAccess.toObject({ virtuals: true }) };
  })
  .catch(err => {
    throw new Error(typeof err === 'object' ? (err.message || err.err) : err);
  });
}
*/
