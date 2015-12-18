import User from '../models/User';
import serverConfig from '../config';
import loginService from './login';

function userRegister(user, password) {
  return new Promise((resolve, reject) => {
    User.register(user, password, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export default function register(email, password, req, res) {
  return Promise.resolve().then(async () => {
    // TODO: validation

    if (!email || email === 'undefined') {
      throw new Error(`The 'email' query parameter cannot be empty.`);
    }

    if (!password || password === 'undefined') {
      throw new Error(`The 'password' query parameter cannot be empty.`);
    }

    // Actual registration

    try {
      await userRegister(new User({ email }), password);
    } catch (err) {
      throw new Error(err.message);
    }

    const isActivationRequired = serverConfig.ACCOUNT_ACTIVATION;
    if (isActivationRequired) {
      // TODO: send activation email
      return { isActivationRequired: true };
    }
    // auto login
    try {
      await loginService(email, password, req, res);
    } catch (err) {
      throw err;
    }
    return { isActivationRequired: false };
  });
}
