const express = require('express');
const salesController = require('../controllers/salesControllers');
const { validateSale } = require('../middlewares/validateSale');

const salesRouter = express.Router();

salesRouter.get('/', salesController.controllerGetAll);

salesRouter.get('/:id', salesController.controllerGetId);

salesRouter.post('/', validateSale, salesController.controllerAddSales);

salesRouter.delete('/:id', salesController.controllerDeleteSales);

salesRouter.put('/:id', validateSale, salesController.controllerUpdateSales);

module.exports = {
  salesRouter,
};
