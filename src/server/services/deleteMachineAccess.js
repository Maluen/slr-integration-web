import MachineAccess from '../models/MachineAccess';
import currentUserService from './currentUser';

export default function deleteMachineAccess(id, req) {
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

    const machineAccess = await MachineAccess.findById(id);

    if (!machineAccess) {
      throw new Error('The requested machine access does not exists.');
    }

    try {
      const count = await MachineAccess.count({
        machine: machineAccess.machine,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (count === 0) {
        throw new Error('Access denied: you must be an Administrator of this machine to remove access.');
      }
    } catch (err) {
      throw new Error(err.err);
    }

    if (machineAccess.user.equals(currentUser._id)) {
      throw new Error('You can\'t remove your own access.');
    }

    try {
      await machineAccess.remove();
    } catch (err) {
      throw new Error(err.err);
    }

    return { machineAccess: machineAccess.toObject({ virtuals: true }) };
  });
}
