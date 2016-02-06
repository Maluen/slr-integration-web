import { Router } from 'express';
import deleteProjectService from '../services/Project/deleteProject';

const router = new Router();

router.post('/deleteProject', async (req, res) => {
  try {
    const { id } = req.body;
    const response = await deleteProjectService(id, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
