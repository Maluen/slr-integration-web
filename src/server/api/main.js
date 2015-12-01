import { Router } from 'express';

const router = new Router();

router.use(require('./content'));
router.use(require('./register'));
router.use(require('./login'));

export default router;
