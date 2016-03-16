import MachineAccess from '../../models/MachineAccess';
import Machine from '../../models/Machine';

import authenticated from '../middlewares/authenticated';

export const readMachineAccesses = {
  method: 'get',
  remote: true,
  parameters: {
    machineId: String,
  },
  handler: [authenticated, ({ machineId, req, currentUser }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      if (!machineId) {
        throw new Error(`The 'machineId' query parameter cannot be empty.`);
      }

      const machineAccessCount = await MachineAccess.count({
        machine: machineId,
        user: currentUser._id,
      });
      if (machineAccessCount === 0) {
        throw new Error('Access denied: you must have access to this machine (with any permission) to view its users.');
      }

      const machineAccessList = await MachineAccess.find({
        machine: machineId,
      }).populate('user');

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
  }],
};
