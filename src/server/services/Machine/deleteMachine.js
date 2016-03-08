import Machine from '../../models/Machine';
import MachineAccess from '../../models/MachineAccess';

import authenticated from '../middlewares/authenticated';

export const deleteMachine = {
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

      const machine = await Machine.findById(id);
      if (!machine) {
        throw new Error('The requested machine does not exists.');
      }

      const machineAccessCount = await MachineAccess.count({
        machine: id,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (machineAccessCount === 0) {
        throw new Error('Access denied: you must be an Administrator of this machine to delete it.');
      }

      // Remove all the machine accesses first

      const machineAccessList = await MachineAccess.find({ machine: id });
      const machineAccessRemovePromises = [];
      machineAccessList.forEach(machineAccess => {
        const promise = machineAccess.remove();
        machineAccessRemovePromises.push(promise);
      });
      await Promise.all(machineAccessRemovePromises);

      // Remove the machine
      await machine.remove();

      return { machine: machine.toObject({ virtuals: true }) };
    });
  }],
};

/*
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

    const machineAccessCount = await MachineAccess.count({
      machine: id,
      user: currentUser._id,
      permission: 'Administrator',
    });
    if (machineAccessCount === 0) {
      throw new Error('Access denied: you must be an Administrator of this machine to delete it.');
    }

    // Remove all the machine accesses first

    const machineAccessList = await MachineAccess.find({ machine: id });
    const machineAccessRemovePromises = [];
    machineAccessList.forEach(machineAccess => {
      const promise = machineAccess.remove();
      machineAccessRemovePromises.push(promise);
    });
    await Promise.all(machineAccessRemovePromises);

    // Remove the machine
    await machine.remove();

    return { machine: machine.toObject({ virtuals: true }) };
  })
  .catch(err => {
    throw new Error(typeof err === 'object' ? (err.message || err.err) : err);
  });
}
*/