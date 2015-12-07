import User from '../models/User';
import serverSettings from '../settings';
import loginService from './login';

export default function register(email, password, req, res) {
  return new Promise((resolve, reject) => {
    // TODO: validation

    if (!email || email === 'undefined') {
      reject({error: `The 'email' query parameter cannot be empty.`});
      return;
    }

    if (!password || password === 'undefined') {
      reject({error: `The 'password' query parameter cannot be empty.`});
      return;
    }

    // Actual registration

    User.register(new User({ email }), password, (err) => {
      if (err) {
        reject({ error: err.message });
      } else {
        const isActivationRequired = serverSettings.ACCOUNT_ACTIVATION;
        if (isActivationRequired) {
          // TODO: send activation email
          resolve({ isActivationRequired: true });
        } else {
          // auto login
          loginService(email, password, req, res).then(() => {
            resolve({ isActivationRequired: false });
          }, reject);
        }
      }
    });
  });
}
