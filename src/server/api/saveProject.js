import { Router } from 'express';
import saveProjectService from '../services/saveProject';

const router = new Router();

router.post('/saveProject', async (req, res) => {
  try {
    const { id, name } = req.body;
    const response = await saveProjectService(id, name, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
