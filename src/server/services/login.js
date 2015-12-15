import passport from 'passport';

export default function login(email, password, req, res) {
  return new Promise((resolve, reject) => {
    // HACK: passport requires <username, password> POST data
    req.body.username = email;
    req.body.password = password;

    passport.authenticate('local', (err, user) => {
      if (err) {
        return reject({ error: err });
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        return reject({ error: 'Invalid email or password' });
      }
      req.login(user, (otherErr) => {
        if (otherErr) {
          return reject({ error: otherErr });
        }
        resolve({ user: user.toObject({ virtuals: true }) });
      });
    })(req, res);
  });
}
