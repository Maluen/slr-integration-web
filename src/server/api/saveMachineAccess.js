import { Router } from 'express';
import saveMachineAccessService from '../services/Machine/saveMachineAccess';

const router = new Router();

router.post('/saveMachineAccess', async (req, res) => {
  try {
    const { machineId, userId, permission } = req.body;
    const response = await saveMachineAccessService(machineId, userId, permission, undefined, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
