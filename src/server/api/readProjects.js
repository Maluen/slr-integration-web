import { Router } from 'express';
import readProjectsService from '../services/Project/readProjects';

const router = new Router();

router.get('/readProjects', async (req, res) => {
  try {
    const filterObj = JSON.parse(req.query.filterObj);
    const response = await readProjectsService(filterObj, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
