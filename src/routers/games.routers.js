import { Router } from 'express';
import { insertGame, listGames } from '../controllers/games.controllers.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { gameSchema } from '../schemas/game.schema.js';

const router = Router();

router.post('/games', validateSchema(gameSchema), insertGame);
router.get('/games', listGames);

export default router;
