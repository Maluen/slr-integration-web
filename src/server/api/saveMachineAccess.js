import { Router } from 'express';
import saveMachineAccessService from '../services/saveMachineAccess';

const router = new Router();

router.post('/saveMachineAccess', async (req, res) => {
  try {
    const { id, machineId, userId, permission } = req.body;
    const response = await saveMachineAccessService(id, machineId, userId, permission, null, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
