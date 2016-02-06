import { Router } from 'express';
import deleteProjectAccessService from '../services/Project/deleteProjectAccess';

const router = new Router();

router.post('/deleteProjectAccess', async (req, res) => {
  try {
    const { id } = req.body;
    const response = await deleteProjectAccessService(id, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
