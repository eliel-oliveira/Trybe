const { salesModels } = require('../models');
const errorMessages = require('../helpers/errorMessages');
const statusCode = require('../helpers/statusCode');
const { modelDeleteSales, modelDeleteSalesProducts } = require('../models/salesModels');

const serviceGetAll = async () => {
  const result = await salesModels.modelGetAll(); // Busca todos elementos da tabela  StorageManager.products
  if (result.length > 0) { // caso de sucesso, retorna todos elementos da tabela status code 200
    return {
      message: result,
      status: statusCode.OK,
    };
  } return { // caso de falha, retorna mensagem de erro com status code 400 BadRequest
    message: errorMessages.notFoundData,
    status: statusCode.BadRequest,
  };
};

const serviceGetId = async (id) => {
  const result = await salesModels.modelGetId(id);
  if (result.length > 0) { // caso de sucesso, retorna todos elementos da tabela status code 200
    return {
      message: result,
      status: statusCode.OK,
    };
  } return { // caso de falha, retorna mensagem de erro com status code 400 BadRequest
    message: { message: errorMessages.saleNotFound },
    status: statusCode.NotFound,
  };
};

const getDate = () => {
  const date = new Date();
  const sendDate = { date };
  return sendDate;
};

const validatateProducts = async (sales) => {
  const promiseProducts = sales.map((sale) => serviceGetId(sale.productId));
  const validateQuantity = sales.some(({ quantity }) => quantity < 1);
  const checkProducts = Promise.all(promiseProducts);
  const validateProducts = (await checkProducts).some(({ status }) => status === 404);
  if (validateProducts) {
    return { status: statusCode.NotFound };
  } if (validateQuantity) {
    return { status: statusCode.BadRequest };
  }
  return { status: statusCode.OK };
};

const serviceAddSales = async (sales) => {
  const checkProducts = await validatateProducts(sales);
  if (checkProducts.status === 404) {
    return {
      message: { message: errorMessages.productNotFound },
      status: statusCode.NotFound };
  } if (checkProducts.status === 400) {
    return { message: { message: errorMessages.quantityInvalid },
      status: statusCode.BadRequest };
  }
  const date = await getDate();
  const insertDate = await salesModels.modelAddSales(date);
  const id = insertDate;
  const promiseSalesProduct = sales.map((sale) => salesModels
    .modelAddSalesProducts({ saleId: id, ...sale }));
  await Promise.all(promiseSalesProduct);
  return { status: statusCode.CreatedSucess, message: { id, itemsSold: sales } };
};

const serviceDeleteSaleById = async (id) => {
  const checkId = await serviceGetId(id);
  if (checkId.status === statusCode.NotFound) return checkId; 
  await modelDeleteSales(id);
  await modelDeleteSalesProducts(id);
  return { status: statusCode.sucessRequestDelete, message: checkId.message };
};

const serviceUpdateSaleById = async (objectUpdate) => {
  const { id, itemsUpdated } = objectUpdate;
  const checkId = await serviceGetId(id);
  if (checkId.status === statusCode.NotFound) return checkId;
  const checkProducts = await validatateProducts(itemsUpdated);
  if (checkProducts.status === 404) {
    return { message: { message: errorMessages.productNotFound }, status: statusCode.NotFound };
  } if (checkProducts.status === 400) {
    return { message: { message: errorMessages.quantityInvalid }, status: statusCode.BadRequest };
  }
  await modelDeleteSalesProducts(id);
  const promiseSalesProduct = itemsUpdated.map((sale) => salesModels
    .modelAddSalesProducts({ saleId: id, ...sale }));
  await Promise.all(promiseSalesProduct);
  return { status: statusCode.OK, message: { saleId: id, itemsUpdated } };
};
  
module.exports = {
  serviceGetAll,
  serviceGetId,
  serviceAddSales,
  serviceDeleteSaleById,
  serviceUpdateSaleById,
};