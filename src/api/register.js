import User from './models/User';

const register = async (req, res, next) => {
  try {
    const email = req.query.email;
    const password = req.query.password;

    // validation

    if (!email || email === 'undefined') {
      res.status(400).send({error: `The 'email' query parameter cannot be empty.`});
      return;
    }

    if (!password || password === 'undefined') {
      res.status(400).send({error: `The 'password' query parameter cannot be empty.`});
      return;
    }

    // STUB

    User.register(new User({ email }), password, (err) => {
      if (err) {
        res.status(400).send({
          error: err.message,
        });
      } else {
        res.status(200).send({
          checkActivation: true,
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

export default register;

