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
    .isBoolean().withMessage('Disponible debe ser un valor booleano.')
    .toBoolean(), // Convert to boolean if it's a string like "true" or "false"
  body('cantidad')
    .isNumeric().withMessage('La cantidad debe ser un número.')
    .notEmpty().withMessage('La cantidad es requerida.'),
  (req, res, next) => {
    if (typeof req.body.disponible === 'undefined') {
      req.body.disponible = true; // Set to true if not provided
    }
    next();
  },
  validate,
];

const getProductByIdValidator = [
  param('id').isNumeric().withMessage('El ID debe ser un número.'),
  validate,
];

const updateProductValidator = [
  param('id').isString().withMessage('El ID debe ser un texto.'),
  body('nombre')
    .optional()
    .isString().withMessage('El nombre debe ser un texto.')
    .notEmpty().withMessage('El nombre no puede estar vacío.'),
  body('precio')
    .optional()
    .isNumeric().withMessage('El precio debe ser un número.')
    .notEmpty().withMessage('El precio no puede estar vacío.'),
  body('disponible')
    .optional()
    .isBoolean().withMessage('Disponible debe ser un valor booleano.')
    .toBoolean(),
  body('cantidad')
    .optional()
    .isNumeric().withMessage('La cantidad debe ser un número.'),
  validate,
];

export { createProductValidator, getProductByIdValidator, updateProductValidator };
