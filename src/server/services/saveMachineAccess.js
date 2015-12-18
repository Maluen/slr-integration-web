import MachineAccess from '../models/MachineAccess';
import currentUserService from './currentUser';

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
      try {
        const count = await MachineAccess.count({
          machine: machineId,
          user: currentUser._id,
          permission: 'Administrator',
        });
        if (count === 0) {
          throw new Error('Access denied: you must be an Administrator of this machine to add users to it.');
        }
      } catch (err) {
        throw new Error(err.err);
      }
    } else {
      if (permission !== 'Administrator') {
        throw new Error({ error: 'Machine creator can only be an Administrator.' });
      }
    }

    // check if user already has access to this machine (with any permission)
    // update permission in such a case, create otherwise

    let machineAccess;
    try {
      machineAccess = await MachineAccess.findOne({
        machine: machineId,
        user: userId,
      });
    } catch (err) {
      throw new Error(err.err);
    }

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

    try {
      await machineAccess.save();
    } catch (err) {
      throw new Error(err.err);
    }

    return { machineAccess: machineAccess.toObject({ virtuals: true }) };
  });
}
