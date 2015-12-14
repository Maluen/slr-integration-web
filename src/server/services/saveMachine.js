import Machine from '../models/Machine';
import currentUserService from './currentUser';
import saveMachineAccessService from './saveMachineAccess';

export default function saveMachine(id = null, hostname, port, req) {
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
      saveMachineAccessService(null, machine._id, currentUser._id, 'Administrator', { isAfterCreate: true }, req)
        .then(resolve.bind(null, { machine: machine.toObject() }), reject);
    });
  });
}
