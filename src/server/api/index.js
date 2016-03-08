import { Router } from 'express';

const router = new Router();

router.use(require('./content'));
router.use(require('./services'));

export default router;
