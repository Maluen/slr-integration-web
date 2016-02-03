import { Router } from 'express';
import readSearchesService from '../services/readSearches';

const router = new Router();

router.get('/readSearches', async (req, res) => {
  try {
    const { projectId } = req.query;
    const filterObj = JSON.parse(req.query.filterObj);
    const response = await readSearchesService(projectId, filterObj, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
