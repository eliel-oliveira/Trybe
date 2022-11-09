const errorMessages = require('../helpers/errorMessages');
const statusCode = require('../helpers/statusCode');

const validateProductNameExist = (req, res, next) => {
  const product = req.body;
  if (!product.name) {
    return res.status(statusCode.BadRequest).json({ message: errorMessages.missingName });
  }
  return next();
};

const isValidProductName = (req, res, next) => {
  const product = req.body;
  const minCaracters = 5;
  if (product.name.length < minCaracters) {
    return res.status(statusCode.UnprocessableEntity).json({ message: errorMessages.invalidname });
  }
  return next();
};

module.exports = {
  validateProductNameExist,
  isValidProductName,
};