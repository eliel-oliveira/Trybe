const productDetails = require('../src/productDetails');
/*
  A função productDetails recebe duas strings que representam nomes de produtos, e retorna um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara')

  // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  Escreva pelo menos cinco testes para essa função para garantir que a implementação de productDetails está correta.

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  const chamada = productDetails('Alcool gel', 'Máscara')
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    // ESCREVA SEUS TESTES ABAIXO:
  });

  // Teste se productDetails é uma função.
  it('Teste se productDetails é uma função.', () => {
    expect(typeof productDetails).toBe('function');
  });

  // Teste se o retorno da função é um array.
  it('Teste se o retorno da função é um array.', () => {
    expect(Array.isArray(chamada)).toBe(true);
  });

  // Teste se o array retornado pela função contém dois itens dentro.
  it('Teste se o array retornado pela função contém dois itens dentro.', () => {
    expect((chamada).length).toBe(2);
  });

  // Teste se os dois itens dentro do array retornado pela função são objetos.
  it('Teste se os dois itens dentro do array retornado pela função são objetos.', () => {
    expect(typeof Object.entries(chamada)[0]).toBe('object')
    expect(typeof Object.entries(chamada)[1]).toBe('object')
  });

  // Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.
  it('Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.', () => {
    expect(chamada[0]).not.toBe(chamada[1]);
  });

  // Teste se os dois productIds terminam com 123.
  it('Teste se os dois productIds terminam com 123.', () => {
    const product1 = chamada[0].details.productId.slice(-3);
    expect(product1).toBe('123');
    const product2 = chamada[1].details.productId.slice(-3);
    expect(product2).toBe('123');
  });
});