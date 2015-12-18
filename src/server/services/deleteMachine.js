import Machine from '../models/Machine';
import MachineAccess from '../models/MachineAccess';
import currentUserService from './currentUser';

export default function deleteMachine(id, req) {
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

    const machine = await Machine.findById(id);

    if (!machine) {
      throw new Error('The requested machine does not exists.');
    }

    try {
      const count = await MachineAccess.count({
        machine: id,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (count === 0) {
        throw new Error('Access denied: you must be an Administrator of this machine to delete it.');
      }
    } catch (err) {
      throw new Error(err.err);
    }

    // Remove all the machine accesses first

    let machineAccessList = [];
    try {
      machineAccessList = await MachineAccess.find({ machine: id });
    } catch (err) {
      throw new Error(err.err);
    }
    const machineAccessRemovePromises = [];
    machineAccessList.forEach(machineAccess => {
      const promise = machineAccess.remove();
      machineAccessRemovePromises.push(promise);
    });
    try {
      await Promise.all(machineAccessRemovePromises);
    } catch (err) {
      throw new Error(err.err);
    }

    // Remove the machine

    try {
      await machine.remove();
    } catch (err) {
      throw new Error(err.err);
    }

    return { machine: machine.toObject({ virtuals: true }) };
  });
}
