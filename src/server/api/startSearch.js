import { Router } from 'express';
import startSearchService from '../services/Search/startSearch';

const router = new Router();

router.post('/startSearch', async (req, res) => {
  try {
    const { projectId, id, machineId, resume } = req.body;
    const response = await startSearchService(projectId, id, machineId, resume, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
