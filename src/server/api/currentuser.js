import { Router } from 'express';
import currentuserService from '../services/currentuser';

const router = new Router();

router.get('/currentuser', async (req, res) => {
  try {
    const response = await currentuserService(req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
