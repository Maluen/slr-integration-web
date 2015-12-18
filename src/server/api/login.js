import { Router } from 'express';
import loginService from '../services/login';

const router = new Router();

router.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const response = await loginService(email, password, req, res);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
