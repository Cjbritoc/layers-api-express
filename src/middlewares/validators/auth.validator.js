import { body, validationResult, matchedData } from 'express-validator';
import { BadRequestError } from '../../utils/errors.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    throw new BadRequestError(errorMessages);
  }
  res.locals.credential = matchedData(req);
  next();
};

const loginValidator = [
  body('email')
    .isEmail().withMessage('Debe proporcionar un email válido.')
    .notEmpty().withMessage('El email es requerido.'),
  body('password')
    .isString().withMessage('El password debe ser un texto.')
    .notEmpty().withMessage('El password es requerido.'),
  validate,
];

export { loginValidator };
