const { body } = require('express-validator');

const validateContact = [
  body('firstname')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('El nombre es obligatorio'),

  body('lastname')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('El apellido es obligatorio'),

  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido'),

  body('phone')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('El teléfono debe ser texto'),
];

module.exports = {
  validateContact
};


