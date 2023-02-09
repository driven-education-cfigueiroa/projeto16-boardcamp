import joi from 'joi';

export const rentalSchema = joi.object({
  customerId: joi.number().required(),
  gameId: joi.number().required(),
  rentDate: joi.date().required(),
  daysRented: joi.number().required(),
  returnDate: joi.date(),
  originalPrice: joi.number().required(),
  delayFee: joi.number(),
});

export const insertRentalSchema = joi.object({
  customerId: joi
    .number()
    .positive()
    .integer()
    .min(1)
    .max(Number.MAX_SAFE_INTEGER)
    .required(),
  gameId: joi
    .number()
    .positive()
    .integer()
    .min(1)
    .max(Number.MAX_SAFE_INTEGER)
    .required(),
  daysRented: joi
    .number()
    .positive()
    .integer()
    .min(1)
    .max(Number.MAX_SAFE_INTEGER)
    .required(),
});
