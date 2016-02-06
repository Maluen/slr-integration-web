import { Router } from 'express';
import readMachineAccessesService from '../services/Machine/readMachineAccesses';

const router = new Router();

router.get('/readMachineAccesses', async (req, res) => {
  try {
    const { machineId } = req.query;
    const response = await readMachineAccessesService(machineId, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
