import { body, param, validationResult, matchedData } from 'express-validator';
import response from '../../utils/response.js';
import { BadRequestError } from '../../utils/errors.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    throw new BadRequestError(errorMessages); // errorMessages is already an array
  }
  res.locals.data = matchedData(req);
  next();
};

const createProductValidator = [
  body('nombre')
    .isString().withMessage('El nombre debe ser un texto.')
    .notEmpty().withMessage('El nombre es requerido.'),
  body('precio')
    .isNumeric().withMessage('El precio debe ser un número.')
    .notEmpty().withMessage('El precio es requerido.'),
  body('disponible')
    .optional()
    .isBoolean().withMessage('Disponible debe ser un valor booleano.'),
  validate,
];

const getProductByIdValidator = [
  param('id').isNumeric().withMessage('El ID debe ser un número.'),
  validate,
];

export { createProductValidator, getProductByIdValidator };
