import { Router } from 'express';
import readUsersService from '../services/readUsers';

const router = new Router();

router.get('/readUsers', async (req, res) => {
  try {
    const filterObj = JSON.parse(req.query.filterObj);
    const response = await readUsersService(filterObj, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
