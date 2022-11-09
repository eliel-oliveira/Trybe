const express = require('express');
const productController = require('../controllers/productsControllers');
const { validateProductNameExist, isValidProductName } = require('../middlewares/validateName');

const productRouter = express.Router();

productRouter.get('/search', productController.controllerSearchProduct);

productRouter.get('/', productController.controllerGetAll);

productRouter.get('/:id', productController.controllerGetId);

productRouter.post('/',
  validateProductNameExist,
  isValidProductName,
  productController.controllerCreateId);

productRouter.put('/:id',
  validateProductNameExist,
  isValidProductName,
   productController.controllerUpdateId);

productRouter.delete('/:id', productController.controllerDeleteById);

module.exports = {
  productRouter,
};