import { Router } from 'express';
import createMachineService from '../services/createMachine';

const router = new Router();

router.post('/createMachine', async (req, res) => {
  try {
    const { hostname, port } = req.body;
    const response = await createMachineService(hostname, port, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
