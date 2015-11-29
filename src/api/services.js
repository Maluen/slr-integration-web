import { Router } from 'express';

const router = new Router();

router.get('/register', require('./register'));

export default router;
