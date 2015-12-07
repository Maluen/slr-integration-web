import { Router } from 'express';
import registerService from '../services/register';

const router = new Router();

router.post('/register', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const response = await registerService(email, password, req, res);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
