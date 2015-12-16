import { Router } from 'express';

const router = new Router();

router.use(require('./content'));
router.use(require('./register'));
router.use(require('./login'));
router.use(require('./currentUser'));
router.use(require('./logout'));
router.use(require('./saveMachine'));
router.use(require('./saveMachineAccess'));
router.use(require('./readMachines'));
router.use(require('./readMachineAccesses'));

export default router;
