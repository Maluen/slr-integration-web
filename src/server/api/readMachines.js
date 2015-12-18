import { Router } from 'express';
import readMachinesService from '../services/readMachines';

const router = new Router();

router.get('/readMachines', async (req, res) => {
  try {
    const filterObj = JSON.parse(req.query.filterObj);
    const response = await readMachinesService(filterObj, req);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
