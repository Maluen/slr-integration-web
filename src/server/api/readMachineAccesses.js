import { Router } from 'express';
import readMachineAccessesService from '../services/readMachineAccesses';

const router = new Router();

router.get('/readMachineAccesses', async (req, res) => {
  try {
    const { machineId } = req.query;
    const response = await readMachineAccessesService(machineId, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
