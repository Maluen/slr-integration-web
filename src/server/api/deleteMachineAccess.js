import { Router } from 'express';
import deleteMachineAccessService from '../services/Machine/deleteMachineAccess';

const router = new Router();

router.post('/deleteMachineAccess', async (req, res) => {
  try {
    const { id } = req.body;
    const response = await deleteMachineAccessService(id, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
