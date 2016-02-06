import { Router } from 'express';
import readProjectAccessesService from '../services/Project/readProjectAccesses';

const router = new Router();

router.get('/readProjectAccesses', async (req, res) => {
  try {
    const { projectId } = req.query;
    const response = await readProjectAccessesService(projectId, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
