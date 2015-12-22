import { Router } from 'express';

const router = new Router();

router.use(require('./content'));
router.use(require('./register'));
router.use(require('./login'));
router.use(require('./currentUser'));
router.use(require('./logout'));
router.use(require('./readUsers'));
router.use(require('./saveProject'));
router.use(require('./deleteProject'));
router.use(require('./saveProjectAccess'));
router.use(require('./readProjects'));
router.use(require('./readProjectAccesses'));
router.use(require('./deleteProjectAccess'));
router.use(require('./saveProject'));
router.use(require('./deleteProject'));
router.use(require('./saveProjectAccess'));
router.use(require('./readProjects'));
router.use(require('./readProjectAccesses'));
router.use(require('./deleteProjectAccess'));

export default router;
