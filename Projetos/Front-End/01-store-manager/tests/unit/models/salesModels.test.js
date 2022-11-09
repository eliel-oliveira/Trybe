const { expect } = require('chai');
const sinon = require('sinon');
const { salesModels } = require('../../../src/models')
const connection = require('../../../src/models/db/connection');
const { mockSellItems, expectProductsSales, mockSales } = require('../mocks/productMock');


describe('Testes da camada Model de sales', function () {
  describe('Listagem de sales', function () {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([mockSellItems])
    });
    afterEach(() => {
      sinon.restore();
    });

    it('Retorna um array com todos elementos de sales', async function () {
      const result = await salesModels.modelGetAll();
      expect(result).to.be.a('array');
      expect(result).to.be.deep.eq(mockSellItems);
    });

    it('Retorna um array com todas vendas buscadas', async function () {
      const result = await salesModels.modelGetId();
      expect(result).to.be.a('array');
      expect(result).to.be.deep.eq(mockSellItems);
    });

    it('Adiciona vendas as tabelas sales_products e sales e retorna objeto de cada item adicionado', async function () {
      sinon.restore();      
      sinon.stub(connection, 'execute')
        .onCall(0).returns(expectProductsSales[0])
        .onCall(1).returns(expectProductsSales[1])
        .onCall(2).returns([{ insertId: 3 }]);            
      const result1 = await salesModels.modelAddSalesProducts(expectProductsSales[0]);
      expect(result1).to.be.a('object');
      expect(result1).to.be.deep.eq(expectProductsSales[0]);      
      const result2 = await salesModels.modelAddSalesProducts(expectProductsSales[1]);
      expect(result2).to.be.a('object');
      expect(result2).to.be.deep.eq(expectProductsSales[1]);
      const result3 = await salesModels.modelAddSales(mockSales[0])
      expect(result3).to.be.a('number');
      expect(result3).to.be.deep.eq(3)
    });

    it('Testa delete de sales', async function () {
      sinon.restore();
      sinon.stub(connection, 'execute')
        .onCall(0).returns(1)
        .onCall(1).returns(1);      
      const id = 1
      const result1 = await salesModels.modelDeleteSales(id);
      expect(result1).to.be.a('number');
      expect(result1).to.be.deep.eq(1)
      const result2 = await salesModels.modelDeleteSalesProducts(id);
      expect(result2).to.be.a('number');
      expect(result2).to.be.deep.eq(1);
    });

    // it('Testa update de sales', async function () {
    //   sinon.restore();
    //   sinon.stub(connection, 'execute')
    //     .onCall(0).resolves(1)
    //     .onCall(1).resolves(1);   
      
    //   const id = 1
    //   const result1 = await salesModels.modelUpdateSales(id);
    //   expect(result1).to.be.a('number');
    //   expect(result1).to.be.deep.eq(1);

    //   const result2 = await salesModels.modelUpdateSales(id);
    //   expect(result2).to.be.a('number');
    //   expect(result2).to.be.deep.eq(1);
    // });
  });
});