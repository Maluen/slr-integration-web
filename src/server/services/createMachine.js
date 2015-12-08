import Machine from '../models/Machine';

export default function createMachine(hostname, port, req) {
  return new Promise((resolve, reject) => {
    // TODO: validation

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

      // TODO: share with current user

      resolve({ machine });
    });
  });
}
