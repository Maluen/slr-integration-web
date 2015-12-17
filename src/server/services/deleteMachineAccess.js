import MachineAccess from '../models/MachineAccess';
import currentUserService from './currentUser';

export default function deleteMachineAccess(id, req) {
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

    if (!id) {
      return reject({error: `The 'id' query parameter cannot be empty.`});
    }

    const machineAccess = await MachineAccess.findById(id);

    if (!machineAccess) {
      return reject({ error: 'The requested machine access does not exists.' });
    }

    try {
      const count = await MachineAccess.count({
        machine: machineAccess.machine,
        user: currentUser._id,
        permission: 'Administrator',
      });
      if (count === 0) {
        return reject({ error: 'Access denied: you must be an Administrator of this machine to remove access.' });
      }
    } catch (err) {
      return reject({ error: err });
    }

    if (machineAccess.user.equals(currentUser._id)) {
      return reject({ error: 'You can\'t remove your own access.' });
    }

    try {
      await machineAccess.remove();
    } catch (err) {
      return reject({ error: err });
    }

    resolve({ machineAccess: machineAccess.toObject({ virtuals: true }) });
  });
}
