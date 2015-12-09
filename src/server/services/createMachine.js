import Machine from '../models/Machine';
import currentuserService from './currentuser';
import createdMachineAccessService from './createMachineAccess';

export default function createMachine(hostname, port, req) {
  return new Promise(async (resolve, reject) => {
    // TODO: validation

    let currentUser = null;
    try {
      const response = await currentuserService(req);
      currentUser = response.user;
    } catch (e) {
      reject({ error: 'Access denied: you must be logged-in.' });
      return;
    }

    if (!hostname || hostname === 'undefined') {
      reject({ error: `The 'hostname' query parameter cannot be empty.` });
      return;
    }

    if (!port || port === 'undefined') {
      reject({ error: `The 'port' query parameter cannot be empty.` });
      return;
    }

    const machine = new Machine({ hostname, port });
    machine.save((err) => {
      if (err) {
        reject({ error: err });
        return;
      }

      // add access to machine creator
      createdMachineAccessService(machine._id, currentUser._id, 'Administrator', { isAfterCreate: true }, req)
        .then(resolve, reject);
    });
  });
}
