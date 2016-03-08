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

/*
export default function readMachines(filterObj, req) {
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

    const machineAccessList = await MachineAccess.find({
      user: currentUser._id,
    }).populate('machine');

    let machines = machineAccessList.map(machineAccess => machineAccess.machine.toObject({ virtuals: true }));

    // filter
    if (typeof filterObj === 'object' && filterObj !== null) {
      machines = filter(machines, filterObj);
    }

    return { machines };
  })
  .catch(err => {
    throw new Error(typeof err === 'object' ? (err.message || err.err) : err);
  });
}
*/