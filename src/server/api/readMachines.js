import { Router } from 'express';
import readMachinesService from '../services/readMachines';

const router = new Router();

router.get('/readMachines', async (req, res) => {
  try {
    const response = await readMachinesService(req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
