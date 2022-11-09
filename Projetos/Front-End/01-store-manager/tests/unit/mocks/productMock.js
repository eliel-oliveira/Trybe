const mockProductModel = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  }
]

const atualizarMock = [
  {
    "id": 2,
    "name": "Martelo do Batman"
  }
]


const returnService = {
  status: 200,
  message: mockProductModel
}

const returnServiceFirst = {
  status: 200,
  message: mockProductModel[0]
}

const returnAddItem = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "ProdutoX"
  }
]

const retrunItemAdd = {
  status: 201,
  message: {
    "id": 3,
    "name": "ProdutoX"
  }
}

const updatedProduct = {
  status: 200,
  message: {
    "id": 2,
    "name": "Martelo do Batman"
  }
}

const mockSellItems = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]

const mockServiceSales = {
  message: [ mockSellItems ],
  status: 200,
}

const expectProductsSales = [
  {
    "saleId": 3,
    "productId": 1,
    "quantity": 1
  },
  {
    "saleId": 3,
    "productId": 2,
    "quantity": 5
  }
]

const mockSales = [
  {
    "date": "2022-10-09T04:54:29.000Z",
  }
]

const mockServicesAddSales = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const invalidMock = [
  {
    "productId": 1,
    "quantity": -5
  },
  {
    "productId": 55,
    "quantity": 0
  }
]

const invalidMock2 = [
  {
    "productId": 1,
    "quantity": -5
  },
  {
    "productId": 2,
    "quantity": 0
  }
]
const expectServiceSales = 
{
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const returnDeleteSales = {
  status: 204,
  message: mockSellItems
}

const mockResultServiceSales = { status: 201, message: mockSellItems }

module.exports = {
  mockProductModel,
  returnService,
  returnServiceFirst,
  returnAddItem,
  retrunItemAdd,
  mockSellItems,
  mockServiceSales,
  atualizarMock,
  updatedProduct,
  expectProductsSales,
  mockSales,
  mockServicesAddSales,
  expectServiceSales,
  mockResultServiceSales,
  invalidMock,
  invalidMock2,
  returnDeleteSales,
}