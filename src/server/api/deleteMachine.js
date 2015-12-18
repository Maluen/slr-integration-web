import { Router } from 'express';
import deleteMachineService from '../services/deleteMachine';

const router = new Router();

router.post('/deleteMachine', async (req, res) => {
  try {
    const { id } = req.body;
    const response = await deleteMachineService(id, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
