import MachineAccess from '../models/MachineAccess';
import currentUserService from './currentUser';

export default function readMachines(req) {
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

    const machines = machineAccessList.map(machineAccess => machineAccess.machine.toObject());

    resolve({ machines });
  });
}
