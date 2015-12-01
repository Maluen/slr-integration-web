import { Router } from 'express';
import passport from 'passport';

const router = new Router();

router.post('/login', (req, res, next) => {
  try {
    // HACK: passport requires <username, password> fields
    req.body.username = req.body.email;

    passport.authenticate('local', (err, user) => {
      if (err) {
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        return res.status(400).send({ error: 'Invalid email or password' });
      }
      return res.status(200).send();
    })(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default router;
