import MachineAccess from '../../models/MachineAccess';
import currentUserService from '../User/currentUser';
import filter from 'lodash.filter';

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

    let machineAccessList = [];
    try {
      machineAccessList = await MachineAccess.find({
        user: currentUser._id,
      }).populate('machine');
    } catch (err) {
      throw new Error(err.err);
    }

    let machines = machineAccessList.map(machineAccess => machineAccess.machine.toObject({ virtuals: true }));

    // filter
    if (typeof filterObj === 'object' && filterObj !== null) {
      machines = filter(machines, filterObj);
    }

    return { machines };
  });
}
