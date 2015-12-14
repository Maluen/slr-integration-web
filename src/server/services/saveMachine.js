import Machine from '../models/Machine';
import MachineAccess from '../models/MachineAccess';
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

    let machine;
    if (id) {
      // update
      machine = await Machine.findOne({ _id: id });
      if (!machine) {
        return reject({ error: 'The machine does not exists.' });
      }

      const machineAccess = await MachineAccess.findOne({
        user: currentUser._id,
        machine: id,
        permission: 'Administrator',
      });
      if (!machineAccess) {
        return reject({ error: 'Access denied: you must be an Administrator of this machine to edit it.' });
      }

      machine.hostname = hostname;
      machine.port = port;
    } else {
      // create
      machine = new Machine({ hostname, port });
    }

    machine.save((err) => {
      if (err) {
        return reject({ error: err });
      }

      if (!id) {
        // add access to machine creator
        saveMachineAccessService(machine._id, currentUser._id, 'Administrator', { isAfterCreate: true }, req)
          .then(resolve.bind(null, { machine: machine.toObject() }), reject);
      } else {
        resolve({ machine: machine.toObject() });
      }
    });
  });
}
