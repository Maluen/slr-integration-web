import Machine from '../models/Machine';
import MachineAccess from '../models/MachineAccess';
import currentUserService from './currentUser';
import saveMachineAccessService from './saveMachineAccess';

export default function saveMachine(id = null, name, hostname, port, req) {
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

    if (!name || name === 'undefined') {
      throw new Error(`The 'name' query parameter cannot be empty.`);
    }

    if (!hostname || hostname === 'undefined') {
      throw new Error(`The 'hostname' query parameter cannot be empty.`);
    }

    if (!port || port === 'undefined') {
      throw new Error(`The 'port' query parameter cannot be empty.`);
    }

    let machine;
    if (id) {
      // update

      try {
        machine = await Machine.findOne({ _id: id });
      } catch (err) {
        throw new Error(err.err);
      }

      if (!machine) {
        throw new Error('The machine does not exists.');
      }

      let machineAccess;
      try {
        machineAccess = await MachineAccess.findOne({
          user: currentUser._id,
          machine: id,
          permission: 'Administrator',
        });
      } catch (err) {
        throw new Error(err.err);
      }

      if (!machineAccess) {
        throw new Error('Access denied: you must be an Administrator of this machine to edit it.');
      }

      machine.name = name;
      machine.hostname = hostname;
      machine.port = port;
    } else {
      // create
      machine = new Machine({ name, hostname, port });
    }

    try {
      await machine.save();
    } catch (err) {
      throw new Error(err.err);
    }

    if (!id) {
      // add access to machine creator
      try {
        await saveMachineAccessService(machine._id, currentUser._id, 'Administrator', { isAfterCreate: true }, req);
      } catch (err) {
        throw err;
      }
    }

    return { machine: machine.toObject({ virtuals: true }) };
  });
}
