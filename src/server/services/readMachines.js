import MachineAccess from '../models/MachineAccess';
import currentUserService from './currentUser';
import filter from 'lodash.filter';

export default function readMachines(filterObj, req) {
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


    let machineAccessList = [];
    try {
      machineAccessList = await MachineAccess.find({
        user: currentUser._id,
      }).populate('machine');
    } catch (err) {
      return reject({ error: err });
    }

    let machines = machineAccessList.map(machineAccess => machineAccess.machine.toObject({ virtuals: true }));

    // filter
    if (typeof filterObj === 'object' && filterObj !== null) {
      machines = filter(machines, filterObj);
    }

    resolve({ machines });
  });
}
