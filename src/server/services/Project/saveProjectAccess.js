import ProjectAccess from '../../models/ProjectAccess';

import authenticated from '../middlewares/authenticated';

export const saveProjectAccess = {
  method: 'post',
  remote: true,
  parameters: {
    projectId: String,
    userId: String,
    permission: String,
    options: Object,
  },
  handler: [authenticated, ({ projectId, userId, permission, options = {}, req, currentUser }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

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
        const projectAccessCount = await ProjectAccess.count({
          project: projectId,
          user: currentUser._id,
          permission: 'Administrator',
        });
        if (projectAccessCount === 0) {
          throw new Error('Access denied: you must be an Administrator of this project to add users to it.');
        }
      } else {
        if (permission !== 'Administrator') {
          throw new Error({ error: 'Project creator can only be an Administrator.' });
        }
      }

      // check if user already has access to this project (with any permission)
      // update permission in such a case, create otherwise

      let projectAccess = await ProjectAccess.findOne({
        project: projectId,
        user: userId,
      });

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

      await projectAccess.save();

      return { projectAccess: projectAccess.toObject({ virtuals: true }) };
    });
  }],
};
