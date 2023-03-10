import { Router } from 'express';
import games from './games.routers.js';
import customers from './customers.routers.js';
import rentals from './rentals.routers.js';

const router = Router();

router.use('/games', games);
router.use('/customers', customers);
router.use('/rentals', rentals);

export default router;
