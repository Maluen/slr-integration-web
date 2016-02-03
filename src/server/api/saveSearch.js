import { Router } from 'express';
import saveSearchService from '../services/saveSearch';

const router = new Router();

router.post('/saveSearch', async (req, res) => {
  try {
    const { projectId, id, name } = req.body;
    const response = await saveSearchService(projectId, id, name, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
