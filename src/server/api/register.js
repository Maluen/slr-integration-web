import { Router } from 'express';
import User from '../models/User';
import serverSettings from '../settings';
import passport from 'passport';

const router = new Router();

router.post('/register', (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // TODO: validation

    if (!email || email === 'undefined') {
      res.status(400).send({error: `The 'email' query parameter cannot be empty.`});
      return;
    }

    if (!password || password === 'undefined') {
      res.status(400).send({error: `The 'password' query parameter cannot be empty.`});
      return;
    }

    // Actual registration

    User.register(new User({ email }), password, (err) => {
      if (err) {
        res.status(400).send({
          error: err.message,
        });
      } else {
        const isActivationRequired = serverSettings.ACCOUNT_ACTIVATION;
        if (isActivationRequired) {
          // TODO: send activation email
          res.status(200).send({ isActivationRequired: true });
        } else {
          // auto login

          // HACK: passport requires <username, password> fields
          req.body.username = req.body.email;

          passport.authenticate('local', (loginErr, user) => {
            if (loginErr) {
              return next(loginErr); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (!user) {
              return res.status(400).send({ error: 'Auto login failed: invalid email or password' });
            }
            return res.status(200).send({ isActivationRequired: false });
          })(req, res, next);
        }
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
