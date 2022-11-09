const productService = require('../services/productsServices');

const controllerGetAll = async (_req, res) => {
  const result = await productService.serviceGetAll();
  return res.status(result.status).json(result.message);
};

const controllerGetId = async (req, res) => {
  const { id } = req.params;
  const result = await productService.serviceGetId(id);
  return res.status(result.status).json(result.message);
};

const controllerCreateId = async (req, res) => {
  const product = req.body; // recebe objeto de body
  const result = await productService.serviceCreateId(product); // chama função serviceCreateId passando o body como parametro
  return res.status(result.status).json(result.message); // recebe status
};

const controllerUpdateId = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = {
    id,
    name,
  };
  const result = await productService.updateById(product); // chama função serviceCreateId passando o body como parametro
  return res.status(result.status).json(result.message); // recebe status
};

const controllerDeleteById = async (req, res) => {
  const { id } = req.params;
  const result = await productService.serviceDeleteById(id);
  return res.status(result.status).json(result.message);
};

const controllerSearchProduct = async (req, res) => {
  const { q } = req.query;
  const result = await productService.serviceFilterByName(q);
  return res.status(result.status).json(result.message);
};

module.exports = {
  controllerGetAll,
  controllerGetId,
  controllerCreateId,
  controllerUpdateId,
  controllerDeleteById,
  controllerSearchProduct,
};