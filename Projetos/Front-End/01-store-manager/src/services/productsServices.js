const { productModel } = require('../models');
const errorMessages = require('../helpers/errorMessages');
const statusCode = require('../helpers/statusCode');

const serviceGetAll = async () => {
  const result = await productModel.modelGetAll(); // Busca todos elementos da tabela  StorageManager.products
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
  const result = await productModel.modelGetId(id); // busca por id na tabela StorageManager.products
  if (result) { // caso de sucesso, retorna objeto com status code 200
    return {
      message: result,
      status: statusCode.OK,
    };
  }
  return { // caso de falha retorna mensagem de erro com status code 404 not found
    message: { message: errorMessages.productNotFound },
    status: statusCode.NotFound,
  };
};

const serviceCreateId = async (product) => { 
  const insert = await productModel.modelCreateId(product); // insere dados na model
  const result = await productModel.modelGetId(insert); // busca id inserido na model
  if (result) { // caso de sucesso, retorna objeto com status code 201
    return {
      message: result,
      status: statusCode.CreatedSucess,
    };
  }
  return { // caso de falha, retorna messagem de erro com status code 422 UnprocessableEntity
    message: { message: errorMessages.UnprocessableEntity },
    status: statusCode.UnprocessableEntity,
  };
};

const updateById = async (product) => {
  const { id } = product;
  const checkId = await productModel.modelGetId(id);
  if (checkId) {
    await productModel.modelUpdateProduct(product);
    return {
      message: product,
      status: statusCode.OK,
    };
  }
  return {
    message: { message: errorMessages.productNotFound },
    status: statusCode.NotFound,
  };
};

const serviceDeleteById = async (id) => {
  const checkId = await productModel.modelGetId(id);
  if (checkId) {
    await productModel.modelDeleteById(id);
    return {
      message: checkId,
      status: statusCode.sucessRequestDelete,
    };
  }
  return {
    message: { message: errorMessages.productNotFound },
    status: statusCode.NotFound,
  };
};

const serviceFilterByName = async (searchTerm) => {
  const data = await productModel.modelGetAll();
  const dataFilter = await data
    .filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()));
  if (dataFilter.length > 0) {
    return { status: statusCode.OK, message: dataFilter };
  }
  return { status: statusCode.NotFound, message: { message: errorMessages.productNotFound } };
};

module.exports = {
  serviceGetAll,
  serviceGetId,
  serviceCreateId,
  updateById,
  serviceDeleteById,
  serviceFilterByName,
};