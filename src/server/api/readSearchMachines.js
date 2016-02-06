import { Router } from 'express';
import readSearchMachinesService from '../services/Machine/readSearchMachines';

const router = new Router();

router.get('/readSearchMachines', async (req, res) => {
  try {
    const { searchId } = req.query;
    const response = await readSearchMachinesService(searchId, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
