import { Router } from 'express';
import currentUserService from '../services/currentUser';

const router = new Router();

router.get('/currentUser', async (req, res) => {
  try {
    const response = await currentUserService(req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
