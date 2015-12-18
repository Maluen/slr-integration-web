import { Router } from 'express';
import saveMachineService from '../services/saveMachine';

const router = new Router();

router.post('/saveMachine', async (req, res) => {
  try {
    const { id, hostname, port } = req.body;
    const response = await saveMachineService(id, hostname, port, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
