import Machine from '../../models/Machine';
import MachineAccess from '../../models/MachineAccess';
import { saveMachineAccess } from './saveMachineAccess';
import callService from '../../callService';

import authenticated from '../middlewares/authenticated';

export const saveMachine = {
  method: 'post',
  remote: true,
  parameters: {
    id: String,
    name: String,
    password: String,
    hostname: String,
    port: String,
  },
  handler: [authenticated, ({ id = null, name, password, hostname, port, req, currentUser }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      if (!name) {
        throw new Error(`The 'name' query parameter cannot be empty.`);
      }

      if (!password) {
        throw new Error(`The 'password' query parameter cannot be empty.`);
      }

      if (!hostname) {
        throw new Error(`The 'hostname' query parameter cannot be empty.`);
      }

      if (!port) {
        throw new Error(`The 'port' query parameter cannot be empty.`);
      }

      let machine;
      if (id) {
        // update

        machine = await Machine.findOne({ _id: id });
        if (!machine) {
          throw new Error('The machine does not exists.');
        }

        const machineAccess = await MachineAccess.findOne({
          user: currentUser._id,
          machine: id,
          permission: 'Administrator',
        });
        if (!machineAccess) {
          throw new Error('Access denied: you must be an Administrator of this machine to edit it.');
        }

        machine.name = name;
        machine.password = password;
        machine.hostname = hostname;
        machine.port = port;
      } else {
        // create
        machine = new Machine({ name, password, hostname, port });
      }

      await machine.save();

      if (!id) {
        // add access to machine creator
        await callService(saveMachineAccess, {
          machineId: machine._id,
          userId: currentUser._id,
          permission: 'Administrator',
          options: { isAfterCreate: true },
          req,
        });
      }

      return { machine: machine.toObject({ virtuals: true }) };
    });
  }],
};

/*
export default function saveMachine(id = null, name, password, hostname, port, req) {
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

    if (!name) {
      throw new Error(`The 'name' query parameter cannot be empty.`);
    }

    if (!password) {
      throw new Error(`The 'password' query parameter cannot be empty.`);
    }

    if (!hostname) {
      throw new Error(`The 'hostname' query parameter cannot be empty.`);
    }

    if (!port) {
      throw new Error(`The 'port' query parameter cannot be empty.`);
    }

    let machine;
    if (id) {
      // update

      machine = await Machine.findOne({ _id: id });
      if (!machine) {
        throw new Error('The machine does not exists.');
      }

      const machineAccess = await MachineAccess.findOne({
        user: currentUser._id,
        machine: id,
        permission: 'Administrator',
      });
      if (!machineAccess) {
        throw new Error('Access denied: you must be an Administrator of this machine to edit it.');
      }

      machine.name = name;
      machine.password = password;
      machine.hostname = hostname;
      machine.port = port;
    } else {
      // create
      machine = new Machine({ name, password, hostname, port });
    }

    await machine.save();

    if (!id) {
      // add access to machine creator
      await saveMachineAccess(machine._id, currentUser._id, 'Administrator', { isAfterCreate: true }, req);
    }

    return { machine: machine.toObject({ virtuals: true }) };
  })
  .catch(err => {
    throw new Error(typeof err === 'object' ? (err.message || err.err) : err);
  });
}
*/
