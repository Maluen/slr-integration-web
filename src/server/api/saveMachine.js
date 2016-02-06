import { Router } from 'express';
import saveMachineService from '../services/Machine/saveMachine';

const router = new Router();

router.post('/saveMachine', async (req, res) => {
  try {
    const { id, name, hostname, port } = req.body;
    const response = await saveMachineService(id, name, hostname, port, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
