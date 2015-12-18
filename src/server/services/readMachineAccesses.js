import MachineAccess from '../models/MachineAccess';
import Machine from '../models/Machine';
import currentUserService from './currentUser';

export default function readMachineAccesses(machineId, req) {
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

    try {
      const count = await MachineAccess.count({
        machine: machineId,
        user: currentUser._id,
      });
      if (count === 0) {
        throw new Error('Access denied: you must have access to this machine (with any permission) to view its users.');
      }
    } catch (err) {
      throw new Error(err.err);
    }

    let machineAccessList = [];
    try {
      machineAccessList = await MachineAccess.find({
        machine: machineId,
      }).populate('user');
    } catch (err) {
      throw new Error(err.err);
    }

    const machine = machineAccessList.length ? await Machine.findById(machineAccessList[0].machine) : undefined;
    // TODO: rename to machineUsers
    const machineAccesses = machineAccessList.map(machineAccess => {
      return {
        id: machineAccess.id,
        user: machineAccess.user.toObject({ virtuals: true }),
        permission: machineAccess.permission,
      };
    });

    return { machine: machine.toObject({ virtuals: true }), machineAccesses };
  });
}
