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
      if (!currentUser) {
        return reject({ error: 'Access denied: you must be logged-in.' });
      }
    } catch (err) {
      return reject({ error: err });
    }

    if (!hostname || hostname === 'undefined') {
      return reject({ error: `The 'hostname' query parameter cannot be empty.` });
    }

    if (!port || port === 'undefined') {
      return reject({ error: `The 'port' query parameter cannot be empty.` });
    }

    const machine = new Machine({ hostname, port });
    machine.save((err) => {
      if (err) {
        return reject({ error: err });
      }

      // add access to machine creator
      createdMachineAccessService(machine._id, currentUser._id, 'Administrator', { isAfterCreate: true }, req)
        .then(resolve, reject);
    });
  });
}
