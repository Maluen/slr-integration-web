import User from '../models/User';
import serverConfig from '../config';
import loginService from './login';

export default function register(email, password, req, res) {
  return new Promise((resolve, reject) => {
    // TODO: validation

    if (!email || email === 'undefined') {
      return reject({error: `The 'email' query parameter cannot be empty.`});
    }

    if (!password || password === 'undefined') {
      return reject({error: `The 'password' query parameter cannot be empty.`});
    }

    // Actual registration

    User.register(new User({ email }), password, (err) => {
      if (err) {
        return reject({ error: err.message });
      }

      const isActivationRequired = serverConfig.ACCOUNT_ACTIVATION;
      if (isActivationRequired) {
        // TODO: send activation email
        resolve({ isActivationRequired: true });
      } else {
        // auto login
        loginService(email, password, req, res).then(() => {
          resolve({ isActivationRequired: false });
        }, reject);
      }
    });
  });
}
