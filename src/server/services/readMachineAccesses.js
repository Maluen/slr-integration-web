import MachineAccess from '../models/MachineAccess';
import Machine from '../models/Machine';
import currentUserService from './currentUser';

export default function readMachineAccesses(machineId, req) {
  return new Promise(async (resolve, reject) => {
    // TODO: validation

    let currentUser = null;
    try {
      const response = await currentUserService(req);
      currentUser = response.user;
      if (!currentUser) {
        return reject({ error: 'Access denied: you must be logged-in.' });
      }
    } catch (err) {
      return reject({ error: err });
    }

    if (!machineId) {
      return reject({error: `The 'machineId' query parameter cannot be empty.`});
    }

    try {
      const count = await MachineAccess.count({
        machine: machineId,
        user: currentUser._id,
      });
      if (count === 0) {
        return reject({ error: 'Access denied: you must have access to this machine (with any permission) to view its users.' });
      }
    } catch (err) {
      return reject({ error: err });
    }

    let machineAccessList = [];
    try {
      machineAccessList = await MachineAccess.find({
        machine: machineId,
      }).populate('user');
    } catch (err) {
      return reject({ error: err });
    }

    const machine = machineAccessList.length ? await Machine.findById(machineAccessList[0].machine) : undefined;
    // TODO: rename to machineUsers
    const machineAccesses = machineAccessList.map(machineAccess => {
      return {
        user: machineAccess.user.toObject({ virtuals: true }),
        permission: machineAccess.permission,
      };
    });

    resolve({ machine: machine.toObject({ virtuals: true }), machineAccesses });
  });
}
