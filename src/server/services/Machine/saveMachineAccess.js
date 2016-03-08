import MachineAccess from '../../models/MachineAccess';

import authenticated from '../middlewares/authenticated';

export const saveMachineAccess = {
  method: 'post',
  remote: true,
  parameters: {
    machineId: String,
    userId: String,
    permission: String,
    options: Object,
  },
  handler: [authenticated, ({ machineId, userId, permission, options = {}, req, currentUser}) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      if (!machineId) {
        throw new Error(`The 'machineId' query parameter cannot be empty.`);
      }

      if (!userId) {
        throw new Error(`The 'userId' query parameter cannot be empty.`);
      }

      if (permission !== 'Administrator') { // (only available permission for now)
        throw new Error('Invalid permission.');
      }

      if (!options.isAfterCreate) {
        // current user must have Administrator access
        // to this machine to add another user
        const machineAccessCount = await MachineAccess.count({
          machine: machineId,
          user: currentUser._id,
          permission: 'Administrator',
        });
        if (machineAccessCount === 0) {
          throw new Error('Access denied: you must be an Administrator of this machine to add users to it.');
        }
      } else {
        if (permission !== 'Administrator') {
          throw new Error({ error: 'Machine creator can only be an Administrator.' });
        }
      }

      // check if user already has access to this machine (with any permission)
      // update permission in such a case, create otherwise

      let machineAccess = await MachineAccess.findOne({
        machine: machineId,
        user: userId,
      });

      if (machineAccess) {
        // update access
        if (machineAccess.user.equals(currentUser._id)) {
          throw new Error('You can\'t change your own permission.');
        }
        // update permission
        machineAccess.permission = permission;
      } else {
        // create access
        machineAccess = new MachineAccess({ machine: machineId, user: userId, permission });
      }

      await machineAccess.save();

      return { machineAccess: machineAccess.toObject({ virtuals: true }) };
    });
  }],
};

/*
export default function saveMachineAccess(machineId, userId, permission, options = {}, req) {
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

    if (!machineId) {
      throw new Error(`The 'machineId' query parameter cannot be empty.`);
    }

    if (!userId) {
      throw new Error(`The 'userId' query parameter cannot be empty.`);
    }

    if (permission !== 'Administrator') { // (only available permission for now)
      throw new Error('Invalid permission.');
    }

    if (!options.isAfterCreate) {
      // current user must have Administrator access
      // to this machine to add another user
      const machineAccessCount = await MachineAccess.count({
        machine: machineId,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (machineAccessCount === 0) {
        throw new Error('Access denied: you must be an Administrator of this machine to add users to it.');
      }
    } else {
      if (permission !== 'Administrator') {
        throw new Error({ error: 'Machine creator can only be an Administrator.' });
      }
    }

    // check if user already has access to this machine (with any permission)
    // update permission in such a case, create otherwise

    let machineAccess = await MachineAccess.findOne({
      machine: machineId,
      user: userId,
    });

    if (machineAccess) {
      // update access
      if (machineAccess.user.equals(currentUser._id)) {
        throw new Error('You can\'t change your own permission.');
      }
      // update permission
      machineAccess.permission = permission;
    } else {
      // create access
      machineAccess = new MachineAccess({ machine: machineId, user: userId, permission });
    }

    await machineAccess.save();

    return { machineAccess: machineAccess.toObject({ virtuals: true }) };
  })
  .catch(err => {
    throw new Error(typeof err === 'object' ? (err.message || err.err) : err);
  });
}
*/
