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
    let isSuccess = true;

    if (isSuccess) {
      res.status(200).json({
        checkActivation: true,
      });
    } else {
      res.status(400).json({
        errorMessage: 'TODO',
      });
    }
  } catch (err) {
    next(err);
  }
};

export default register;

