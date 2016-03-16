import MachineAccess from '../../models/MachineAccess';

import authenticated from '../middlewares/authenticated';

export const deleteMachineAccess = {
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

      const machineAccess = await MachineAccess.findById(id);

      if (!machineAccess) {
        throw new Error('The requested machine access does not exists.');
      }

      const machineAccessCount = await MachineAccess.count({
        machine: machineAccess.machine,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (machineAccessCount === 0) {
        throw new Error('Access denied: you must be an Administrator of this machine to remove access.');
      }

      if (machineAccess.user.equals(currentUser._id)) {
        throw new Error('You can\'t remove your own access.');
      }

      await machineAccess.remove();

      return { machineAccess: machineAccess.toObject({ virtuals: true }) };
    });
  }],
};
