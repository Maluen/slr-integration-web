import { Router } from 'express';
import deleteSearchService from '../services/deleteSearch';

const router = new Router();

router.post('/deleteSearch', async (req, res) => {
  try {
    const { id } = req.body;
    const response = await deleteSearchService(id, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
