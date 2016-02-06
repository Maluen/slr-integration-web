import { Router } from 'express';
import saveSearchService from '../services/Search/saveSearch';

const router = new Router();

router.post('/saveSearch', async (req, res) => {
  try {
    const { projectId, id, name, settings } = req.body;
    const response = await saveSearchService(projectId, id, name, settings, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
