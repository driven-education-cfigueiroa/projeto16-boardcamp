import { Router } from 'express';
import {
  listCustomers,
  insertCustomer,
  listCustomer,
  updateCustomer,
} from '../controllers/customers.controllers.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { customerSchema } from '../schemas/customer.schema.js';

const router = Router();

router.get('/customers/', listCustomers);
router.post('/customers', validateSchema(customerSchema), insertCustomer);
router.get('/customers/:id', listCustomer);
router.put('/customers/:id', validateSchema(customerSchema), updateCustomer);

export default router;
