const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { mockServiceSales, mockServicesAddSales, mockResultServiceSales, returnDeleteSales } = require('../mocks/productMock');
const salesService = require('../../../src/services/salesServices');
const salesController = require('../../../src/controllers/salesControllers');

chai.use(sinonChai);

describe('Testes da camada controllers de sales', function () {
  describe('Listagem de todas as vendas', function () {
    it('Lista todas as vendas', async function () {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'serviceGetAll').resolves(mockServiceSales);
      await salesController.controllerGetAll({}, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(mockServiceSales.message);
    });

    it('Retorna o elemento buscado', async function () {
      const res = {};
      const req = { params: { id: 1 } }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'serviceGetId').resolves(mockServiceSales);
      await salesController.controllerGetId(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(mockServiceSales.message);
    });
  });
  
  describe('Testa adição sales', function () {
    it('Testa adição de vendas', async function () {
      const res = {};
      const req = { body: mockServicesAddSales };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'serviceAddSales').resolves(mockResultServiceSales);

      await salesController.controllerAddSales(req, res);
      expect(res.status).to.have.been.calledOnceWith(201);

      expect(res.json).to.have.been.calledOnceWith(mockResultServiceSales.message);
    });
  });

  describe('Testa delete de sales', function () {
    it('Testa se o delete de sales', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'serviceDeleteSaleById').resolves(returnDeleteSales);
      await salesController.controllerDeleteSales(req, res);
      expect(res.status).to.have.been.calledOnceWith(204);
      expect(res.json).to.have.been.calledOnceWith(mockResultServiceSales.message);
    });
  });
});