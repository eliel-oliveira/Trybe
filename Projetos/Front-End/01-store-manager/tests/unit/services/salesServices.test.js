const { expect } = require('chai');
const sinon = require('sinon');
const { salesModels } = require('../../../src/models');
const salesServices = require('../../../src/services/salesServices');
const productsService = require('../../../src/services/productsServices');
const { mockSellItems, expectProductsSales, mockSales, mockServicesAddSales, expectServiceSales, invalidMock, invalidMock2, returnAddItem, returnDeleteSales, mockServiceSales } = require('../mocks/productMock');

describe('Teste da camada service de sales', function () {
  describe('Listagem de todas as vendas', function () {
    afterEach(() => {
      sinon.restore();
    });
    it('Caso de sucesso, retorna lista completa de vendas', async function () {
      sinon.stub(salesModels, 'modelGetAll').resolves(mockSellItems);
      const result = await salesServices.serviceGetAll();
      expect(result.message).to.be.a('array');
      expect(result.message).to.be.eq(mockSellItems)
    });

    it('Caso de falha, retorna erro ao tentar listar todos elementos', async function () {
      sinon.stub(salesModels, 'modelGetAll').resolves({});
      const result = await salesServices.serviceGetAll();
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.eq('Dados não encontrados');
    });

  });

  describe('Lista venda buscada', function () {
    afterEach(() => {
      sinon.restore();
    });
    it('Caso de sucesso, retorna lista de vendas buscadas', async function () {
      sinon.stub(salesModels, 'modelGetId').resolves(mockSellItems);
      const result = await salesServices.serviceGetId(1);
      expect(result.message).to.be.a('array');
      expect(result.message).to.be.eq(mockSellItems);
    }) 

    it('Caso de falha, retorna lista de vendas buscadas', async function () {
      sinon.stub(salesModels, 'modelGetId').resolves({});
      const result = await salesServices.serviceGetId(3);
      expect(result.message).to.be.a('object');
      expect(result.message).to.be.deep.eq({ message: 'Sale not found' });
    })
  });  

  describe('Adição de Vendas', function () {
    it('Caso de sucesso, Adiciona vendas as tabelas sales_products e sales e retorna objeto de cada item adicionado', async function () {
      sinon.stub(salesModels, 'modelGetAll').resolves(mockSellItems); // Função deve chamar a modelGet para saber o tamanho do array e criar o id da venda, Retorna todos elementos      
      sinon.stub(salesModels, 'modelGetId').resolves(mockSellItems); // Função que verifica se product ID é valido
      sinon.stub(salesModels, 'modelAddSalesProducts')
      .onCall(0).resolves(expectProductsSales[0])  // Função irá chamar modelAddSales 2 vezes, a primeira passa o primeiro objeto dos produtos, Retorna primeiro objeto adicionado
      .onCall(1).resolves(expectProductsSales[1]); // Função irá chamar modelAddSales 2 vezes, a segunda passa o segundo objeto dos produtos, Retorna segundo objeto adicionado
      sinon.stub(salesModels, 'modelAddSales').resolves(3); // Função irá chamar modelAddSales, para adicionar a data da compra, Retorna number do id da sale
      const result = await salesServices.serviceAddSales(mockServicesAddSales);
      expect(result.message).to.be.a('object');
      expect(result.message).to.be.deep.eq(expectServiceSales);
    });

    it('Caso de falha, Adiciona vendas as tabelas sales_products e sales e retorna objeto de cada item adicionado', async function () {
      sinon.restore();
      sinon.stub(salesModels, 'modelGetAll').resolves(mockSellItems);  
      sinon.stub(salesModels, 'modelGetId').resolves({});
      sinon.stub(salesModels, 'modelAddSalesProducts')
        .onCall(0).resolves(expectProductsSales[0])
        .onCall(1).resolves(expectProductsSales[1]);
      sinon.stub(salesModels, 'modelAddSales').resolves(3);
      const result = await salesServices.serviceAddSales(invalidMock);
      expect(result.message).to.be.a('object');
      expect(result.status).to.be.deep.eq(404);
    });

    it('Caso de falha, Adiciona vendas as tabelas sales_products e sales e retorna objeto de cada item adicionado', async function () {
      sinon.restore();
      sinon.restore();
      sinon.stub(salesModels, 'modelGetAll').resolves(mockSellItems);
      sinon.stub(salesModels, 'modelGetId').resolves(mockSellItems);
      sinon.stub(salesModels, 'modelAddSalesProducts')
        .onCall(0).resolves(expectProductsSales[0])
        .onCall(1).resolves(expectProductsSales[1]);
      sinon.stub(salesModels, 'modelAddSales').resolves(3);
      const result = await salesServices.serviceAddSales(invalidMock2);
      expect(result.message).to.be.a('object');
      expect(result.status).to.be.deep.eq(400);
    });
  });

  describe('Delete items', function () {
    it('Testa delete com sucesso', async function () {
      sinon.restore();
      sinon.stub(salesModels, 'modelGetId').resolves(mockSellItems);
      sinon.stub(salesModels, 'modelDeleteSales').resolves(1);
      sinon.stub(salesModels, 'modelDeleteSalesProducts').resolves(1);
      const id = 1;
      const result = await salesServices.serviceDeleteSaleById(id);
      expect(result.message).to.be.a('array');
      expect(result.status).to.be.deep.eq(204);
    });
    
    it('Testa delete com falha, id nao encontrado', async function () {
      sinon.restore();
      sinon.stub(salesModels, 'modelGetId').resolves({});
      const id = 1;
      const result = await salesServices.serviceDeleteSaleById(id);
      expect(result.message).to.be.a('object');
      expect(result.status).to.be.deep.eq(404);
    });
  });
})
