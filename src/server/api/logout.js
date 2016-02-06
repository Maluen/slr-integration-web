import { Router } from 'express';
import logoutService from '../services/User/logout';

const router = new Router();

router.get('/logout', async (req, res) => {
  try {
    const response = await logoutService(req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
