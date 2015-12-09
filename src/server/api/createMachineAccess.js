import { Router } from 'express';
import createMachineAccessService from '../services/createMachineAccessService';

const router = new Router();

router.post('/createMachineAccess', async (req, res) => {
  try {
    const { machineId, userId, permission } = req.body;
    const response = await createMachineAccessService(machineId, userId, permission, null, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
