import { Router } from 'express';
import {
  listCustomers,
  insertCustomer,
  listCustomer,
  updateCustomer,
} from '../controllers/customers.controllers.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { customerSchema } from '../schemas/customer.schema.js';

const customers = Router();

customers.get('/', listCustomers);
customers.post('/', validateSchema(customerSchema), insertCustomer);
customers.get('/:id', listCustomer);
customers.put('/:id', validateSchema(customerSchema), updateCustomer);

export default customers;
