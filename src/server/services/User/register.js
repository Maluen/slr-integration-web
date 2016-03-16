import User from '../../models/User';
import serverConfig from '../../config';
import { login } from './login';
import callService from '../../callService.js';

function userRegister(user, password) {
  return new Promise((resolve, reject) => {
    User.register(user, password, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export const register = {
  method: 'post',
  remote: true,
  parameters: {
    email: String,
    password: String,
  },
  handler: [({ email, password, req, res }) => {
    return Promise.resolve().then(async () => {
      // TODO: validation

      if (!email) {
        throw new Error(`The 'email' query parameter cannot be empty.`);
      }

      if (!password) {
        throw new Error(`The 'password' query parameter cannot be empty.`);
      }

      // Actual registration
      await userRegister(new User({ email }), password);

      const isActivationRequired = serverConfig.ACCOUNT_ACTIVATION;
      if (isActivationRequired) {
        // TODO: send activation email
        return { isActivationRequired: true };
      }
      // auto login
      try {
        await callService(login, { email, password, req, res });
      } catch (err) {
        throw err;
      }
      return { isActivationRequired: false };
    });
  }],
};
