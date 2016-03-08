import passport from 'passport';

function passportAuthenticate(req, res) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (err) reject(err);
      else resolve(user);
    })(req, res);
  });
}

function reqLogin(req, user) {
  return new Promise((resolve, reject) => {
    req.login(user, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export const login = {
  method: 'post',
  remote: true,
  parameters: {
    email: String,
    password: String,
  },
  handler: [({ email, password, req, res }) => {
    return Promise.resolve().then(async () => {
      // HACK: passport requires <username, password> POST data
      req.body.username = email;
      req.body.password = password;

      // Generate a JSON response reflecting authentication status

      let user;
      try {
        user = await passportAuthenticate(req, res);
      } catch (err) {
        throw new Error(err);
      }

      if (!user) {
        throw new Error('Invalid email or password');
      }

      try {
        await reqLogin(req, user);
      } catch (err) {
        throw new Error(err);
      }

      return { user: user.toObject({ virtuals: true }) };
    });
  }],
};

/*
export default function login(email, password, req, res) {
  return Promise.resolve().then(async () => {
    // HACK: passport requires <username, password> POST data
    req.body.username = email;
    req.body.password = password;

    // Generate a JSON response reflecting authentication status

    let user;
    try {
      user = await passportAuthenticate(req, res);
    } catch (err) {
      throw new Error(err);
    }

    if (!user) {
      throw new Error('Invalid email or password');
    }

    try {
      await reqLogin(req, user);
    } catch (err) {
      throw new Error(err);
    }

    return { user: user.toObject({ virtuals: true }) };
  })
  .catch(err => {
    throw new Error(typeof err === 'object' ? (err.message || err.err) : err);
  });
}
*/