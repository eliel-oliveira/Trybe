const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { returnService, returnServiceFirst, retrunItemAdd, updatedProduct } = require('../mocks/productMock');
const productService = require('../../../src/services/productsServices');
const productController = require('../../../src/controllers/productsControllers')

chai.use(sinonChai)

describe('Testes da camada Controllers de produtos', function () {
  afterEach(() => {
    sinon.restore();
  });
  describe('listagem de todos produtos', function () {
    it('Lista todos os produtos', async function () {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'serviceGetAll').resolves(returnService);

      await productController.controllerGetAll({}, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(returnService.message);
    });

    it('retorna o ID procurado', async function () {
      const res = {};
      const req = { params: { id: 1 } }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'serviceGetId').resolves(returnServiceFirst);
      await productController.controllerGetId(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(returnService.message[0]);
    });
  });
  describe('Adição de protudos', function () {
    it('Cria com sucesso novo produto', async function () {
      const res = {};
      const req = { body: { name: 'productX' }}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'serviceCreateId').resolves(retrunItemAdd);
      await productController.controllerCreateId(req, res);
      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledOnceWith(retrunItemAdd.message)
    });

    it('Atualiza Produto', async function () {
      const res = {};
      const req = {
        body: { name: 'Martelo do batman' },
        params: {id: 2 },
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'updateById').resolves(updatedProduct);
      await productController.controllerUpdateId(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(updatedProduct.message)
    });
  });

  describe('Deleta protudos', function () {
    it('Deleta com sucesso produto', async function () {
      const res = {};
      const req = { params: { id: 2 } }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'serviceDeleteById').resolves(updatedProduct);
      await productController.controllerDeleteById(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(updatedProduct.message)
    });
  });
});