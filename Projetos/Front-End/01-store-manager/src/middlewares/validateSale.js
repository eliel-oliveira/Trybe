const errorMessages = require('../helpers/errorMessages');
const statusCode = require('../helpers/statusCode');

const validateSale = (req, res, next) => {
  const product = req.body;
  const checkProducts = product.some(({ productId }) => productId);
  const checkQuantity = product.some(({ quantity }) => quantity || quantity >= 0);
  if (!checkProducts) {
    return res.status(statusCode.BadRequest).json({ message: errorMessages.productIsRequired });
  }
  if (!checkQuantity) {
    return res.status(statusCode.BadRequest).json({ message: errorMessages.quantitytIsRequired });
  }
  const checkQuantityValue = product.some(({ quantity }) => quantity < 1);
  if (checkQuantityValue) {
    return res.status(statusCode.UnprocessableEntity)
      .json({ message: errorMessages.quantityInvalid });
  }
  return next();
};

module.exports = {
  validateSale,
};