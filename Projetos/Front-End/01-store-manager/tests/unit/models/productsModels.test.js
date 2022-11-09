const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/db/connection');
const { mockProductModel, returnAddItem, atualizarMock } = require('../mocks/productMock')

describe('Testes da camada Model de produtos', function () {
  afterEach(() => {
    sinon.restore();
  });
  describe('Listagem de produtos', function () {
    
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([mockProductModel])
    });
    afterEach(() => {
      sinon.restore();
    });
    
    it('Retorna um array com todos os elementos', async function () {
      const result = await productModel.modelGetAll();
      expect(result).to.be.a('array');
      expect(result).to.be.deep.eq(mockProductModel);
    });
    
    it('Retorna pela busca do ID', async function () {
      const result = await productModel.modelGetId(1);
      expect(result).to.be.a('object');
      expect(result).to.be.deep.eq(mockProductModel[0])
    });
  });
  
  describe('Teste adição de item', function () {
    it('Adiciona e retorna um novo elemento', async function () { 
      sinon.restore();
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }])
      const result = await productModel.modelCreateId(returnAddItem[2]);
      expect(result).to.equal(3);
    });
  });

  describe('Teste atualizar produto', function () {
    it('Atualiza um produto pelo id', async function () {
      sinon.stub(connection, 'execute').resolves(atualizarMock);
      const result = await productModel.modelUpdateProduct(atualizarMock[0]);
      expect(result).to.be.equal(atualizarMock[0]);
    });
  });

  describe('Teste deletar produto', function () {
    it('Deleta um produto pelo id', async function () {
      sinon.stub(connection, 'execute').resolves(atualizarMock);
      const result = await productModel.modelDeleteById(atualizarMock[0].id);
      expect(result).to.be.equal(atualizarMock[0]);
    });
  });  
});