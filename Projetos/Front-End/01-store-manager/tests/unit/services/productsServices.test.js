const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const productService = require('../../../src/services/productsServices');
const { mockProductModel, returnAddItem, atualizarMock } = require('../mocks/productMock')

describe('Testes da camada Service de produtos', function () {
  afterEach(() => {
    sinon.restore();
  });
  describe('Listar produtos', function () {
    it('Caso de sucesso, retorna lista completa de elementos', async function () {
      sinon.stub(productModel, 'modelGetAll').resolves(mockProductModel);
      const result = await productService.serviceGetAll();
      expect(result.message).to.be.a('array');
      expect(result.message).to.be.eq(mockProductModel);
    });

    it('Caso de falha, retorna erro ao tentar listar todos elementos', async function () {
      sinon.stub(productModel, 'modelGetAll').resolves({});
      const result = await productService.serviceGetAll();
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.eq('Dados não encontrados');
    });

    it('Caso de sucesso, retorna objeto buscado', async function () {
      sinon.stub(productModel, 'modelGetId').resolves(mockProductModel[0]);
      const id = 1;
      const result = await productService.serviceGetId(id);
      expect(result.message).to.be.a('object');
      expect(result.message).to.be.eq(mockProductModel[0])
    });

    it('Caso de falha, retorna erro ao buscar objeto', async function () {
      sinon.stub(productModel, 'modelGetId').resolves();
      const id = 5;
      const result = await productService.serviceGetId(id);
      expect(result.message).to.be.a('object');
      expect(result.message).to.be.deep.eq({ message: 'Product not found' })
    });
  });
  describe('Service adiciona novo item', function () {
    it('Caso sucesso, item é adicionado com sucesso', async function () {
      sinon.stub(productModel, 'modelCreateId').resolves(3);
      sinon.stub(productModel, 'modelGetId').resolves(returnAddItem[2]);
      const product = { name: 'ProdutoX' };
      const result = await productService.serviceCreateId(product);
      expect(result).to.be.a('object');
      expect(result.message).to.be.eq(returnAddItem[2]);
    });

    it('Caso de falha, erro inesperado', async function () {
      sinon.restore();
      sinon.stub(productModel, 'modelCreateId').resolves();
      sinon.stub(productModel, 'modelGetId').resolves();
      const product = { name: 'ProdutoX' };
      const result = await productService.serviceCreateId(product);
      expect(result).to.be.a('object');
      expect(result.message).to.be.deep.eq({ message: '422 Unprocessable Entity' });
    });
  });

  describe('Service Update novo item', function () {
    it('Caso de sucesso', async function () {
      sinon.stub(productModel, 'modelUpdateProduct').resolves(atualizarMock);
      sinon.stub(productModel, 'modelGetId').resolves(atualizarMock);
      const product = { "id": 2, "name": "Martelo do Batman" }
      const result = await productService.updateById(product);
      expect(result).to.be.a('object');
      expect(result.message).to.be.deep.eq(atualizarMock[0]);
    });

    it('Caso de falha', async function () {
      sinon.stub(productModel, 'modelUpdateProduct').resolves(atualizarMock);
      sinon.stub(productModel, 'modelGetId').resolves();
      const product = { "id": 5, "name": "Martelo do Batman" }
      const result = await productService.updateById(product);
      expect(result).to.be.a('object');
      expect(result.message).to.be.deep.eq({ message: 'Product not found' });
    });
  });

  describe('Service Delete novo item', function () {
    it('Caso de sucesso, deleta item com sucesso', async function () {
      sinon.stub(productModel, 'modelDeleteById').resolves(atualizarMock[0]);
      sinon.stub(productModel, 'modelGetId').resolves(atualizarMock[0]);
      const id = 2;
      const result = await productService.serviceDeleteById(id);
      expect(result).to.be.a('object');
      expect(result.message).to.be.deep.eq(atualizarMock[0]);
    });

    it('Caso de falha, retorna erro ao tentar deletar item', async function () {
      sinon.stub(productModel, 'modelDeleteById').resolves();
      sinon.stub(productModel, 'modelGetId').resolves();
      const id = 10;
      const result = await productService.serviceDeleteById(id);
      expect(result).to.be.a('object');
      expect(result.message).to.be.deep.eq({ message: 'Product not found' });
    });
  });
});
