import { Router } from 'express';
import categoriasRouters from './games.routers.js';

const router = Router();

router.use(categoriasRouters);

export default router;
