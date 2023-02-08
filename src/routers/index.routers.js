import { Router } from 'express';
import games from './games.routers.js';
import customers from './customers.routers.js';

const router = Router();

router.use(games);
router.use(customers);

export default router;
