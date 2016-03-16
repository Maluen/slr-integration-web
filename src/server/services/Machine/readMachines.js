import MachineAccess from '../../models/MachineAccess';
import filter from 'lodash.filter';

import authenticated from '../middlewares/authenticated';

export const readMachines = {
  method: 'get',
  remote: true,
  parameters: {
    filterObj: Object,
  },
  handler: [authenticated, ({ filterObj, req, currentUser }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      const machineAccessList = await MachineAccess.find({
        user: currentUser._id,
      }).populate('machine');

      let machines = machineAccessList.map(machineAccess => machineAccess.machine.toObject({ virtuals: true }));

      // filter
      if (typeof filterObj === 'object' && filterObj !== null) {
        machines = filter(machines, filterObj);
      }

      return { machines };
    });
  }],
};
