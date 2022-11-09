const salesService = require('../services/salesServices');

const controllerGetAll = async (_req, res) => {
  const result = await salesService.serviceGetAll();
  return res.status(result.status).json(result.message);
};

const controllerGetId = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.serviceGetId(id);
  return res.status(result.status).json(result.message);
};

const controllerAddSales = async (req, res) => {
  const { body } = req;
  const result = await salesService.serviceAddSales(body);
  return res.status(result.status).json(result.message);
};

const controllerDeleteSales = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.serviceDeleteSaleById(id);
  return res.status(result.status).json(result.message);
};

const controllerUpdateSales = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const objectUpdate = { id, itemsUpdated: body };
  const result = await salesService.serviceUpdateSaleById(objectUpdate);
  return res.status(result.status).json(result.message);
};

module.exports = {
  controllerGetAll,
  controllerGetId,
  controllerAddSales,
  controllerDeleteSales,
  controllerUpdateSales,
};