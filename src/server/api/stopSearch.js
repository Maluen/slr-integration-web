import { Router } from 'express';
import stopSearchService from '../services/Search/stopSearch';

const router = new Router();

router.post('/stopSearch', async (req, res) => {
  try {
    const { projectId, id, machineId } = req.body;
    const response = await stopSearchService(projectId, id, machineId, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
