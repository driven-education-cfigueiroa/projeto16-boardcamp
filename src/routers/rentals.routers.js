import { Router } from 'express';
import { test } from '../controllers/rentals.controllers.js';

const rentals = Router();

rentals.get('/', test);
rentals.post('/', test);
rentals.post('/:id/return', test);
rentals.delete('/:id', test);

export default rentals;
