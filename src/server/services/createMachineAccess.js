import MachineAccess from '../models/MachineAccess';
import currentuserService from './currentuser';

export default function createMachineAccess(machineId, userId, permission, options = {}, req) {
  return new Promise(async (resolve, reject) => {
    // TODO: validation

    let currentUser = null;
    try {
      const response = await currentuserService(req);
      currentUser = response.user;
      if (!currentUser) {
        return reject({ error: 'Access denied: you must be logged-in.' });
      }
    } catch (err) {
      return reject({ error: err });
    }

    if (!machineId) {
      return reject({ error: `The 'machineId' query parameter cannot be empty.` });
    }

    if (!userId) {
      return reject({ error: `The 'userId' query parameter cannot be empty.` });
    }

    if (permission !== 'Administrator') { // (only available permission)
      return reject({ error: 'Invalid permission.' });
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
          return reject({ error: 'Access denied: you must be an Administrator of this machine to add users to it.' });
        }
      } catch (err) {
        return reject({ error: err });
      }

      // check if user already has access to this machine (with any permission)
      // update permission in such a case
      try {
        const machineAccess = await MachineAccess.findOne({
          machine: machineId,
          user: userId,
        });
        if (machineAccess) {
          if (machineAccess.user === currentUser._id) {
            return reject({ error: 'You can\'t change your own permission.' });
          }
          // update permission
          machineAccess.permission = permission;
          try {
            await machineAccess.save();
            return resolve(machineAccess);
          } catch (err) {
            return reject({ error: err });
          }
        }
      } catch (err) {
        return reject({ error: err });
      }
    } else {
      if (permission !== 'Administrator') {
        return reject({ error: 'Machine creator can only be an Administrator.' });
      }
    }

    // add access
    const machineAccess = new MachineAccess({ machine: machineId, user: userId, permission });
    machineAccess.save((err) => {
      if (err) {
        return reject({ error: err });
      }

      resolve(machineAccess);
    });
  });
}
