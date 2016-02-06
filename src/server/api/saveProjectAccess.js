import { Router } from 'express';
import saveProjectAccessService from '../services/Project/saveProjectAccess';

const router = new Router();

router.post('/saveProjectAccess', async (req, res) => {
  try {
    const { projectId, userId, permission } = req.body;
    const response = await saveProjectAccessService(projectId, userId, permission, undefined, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
