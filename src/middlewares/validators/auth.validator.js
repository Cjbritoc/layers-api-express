import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../../utils/errors.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    throw new BadRequestError(errorMessages.join(', '));
  }
  next();
};

const loginValidator = [
  body('email')
    .isEmail().withMessage('Debe proporcionar un email válido.')
    .notEmpty().withMessage('El email es requerido.'),
  body('password')
    .isString().withMessage('La contraseña debe ser un texto.')
    .notEmpty().withMessage('La contraseña es requerida.'),
  validate,
];

export { loginValidator };
