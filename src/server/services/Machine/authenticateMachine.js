import Machine from '../../models/Machine';

export const authenticateMachine = {
  method: 'post',
  remote: false,
  parameters: {
    id: String,
    name: String,
    password: String,
  },
  handler: ({ id, name, password }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      const machine = await Machine.findById(id);
      if (!machine) {
        throw new Error('The requested machine does not exists.');
      }

      if (machine.name !== name || machine.password !== password) {
        throw new Error('Invalid name or password.');
      }

      return { machine: machine.toObject({ virtuals: true }) };
    });
  },
};
