import passport from 'passport';

export default function login(email, password, req, res) {
  return new Promise((resolve, reject) => {
    // HACK: passport requires <username, password> POST data
    req.body.username = email;
    req.body.password = password;

    passport.authenticate('local', (err, user) => {
      if (err) {
        reject({ error: err });
        return;
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        reject({ error: 'Invalid email or password' });
        return;
      }
      req.login(user, (otherErr) => {
        if (otherErr) {
          reject({ error: otherErr });
          return;
        }
        resolve();
      });
    })(req, res);
  });
}
