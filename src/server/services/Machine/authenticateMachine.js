import Machine from '../../models/Machine';

export default function authenticateMachine(id, name, password) {
  return Promise.resolve().then(async () => {
    // TODO: validation

    let machine;
    try {
      machine = await Machine.findById(id);
    } catch (err) {
      throw new Error(err.err);
    }
    if (!machine) {
      throw new Error('The requested machine does not exists.');
    }

    if (machine.name !== name || machine.password !== password) {
      throw new Error('Invalid name or password.');
    }

    return { machine: machine.toObject({ virtuals: true }) };
  });
}
