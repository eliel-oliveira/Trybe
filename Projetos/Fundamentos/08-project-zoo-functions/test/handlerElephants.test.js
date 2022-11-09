const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('verifica se a função handlerElephants não receber parametros retorna undefined', () => {
    expect(handlerElephants()).toBe(undefined);
  });
  it('verifica se ao passar um parametro diferente de uma string para handlerElephants, retorna "Parâmetro inválido, é necessário uma string"', () => {
    expect(handlerElephants(5)).toBe('Parâmetro inválido, é necessário uma string');
  });
  it('verifica se ao passar parametro count retorna a quantidades de elefantes 4', () => {
    expect(handlerElephants('count')).toBe(4);
  });
  it('verifica se ao passar o parametro names, retorna um array de nomes que possui o nome Jefferson', () => {
    const expected = 'Jefferson';
    expect(handlerElephants('names')).toContain(expected);
  });
  it('verifica se ao passar o parametro averageAge, retorna a idade dos elefantes proxima a 10.5', () => {
    expect(handlerElephants('averageAge')).toBeCloseTo(10.5);
  });
  it('verifica se ao passar o parametro location, retorna a direção NW', () => {
    expect(handlerElephants('location')).toBe('NW');
  });
  it('verifica se ao passar o parametro popularity, retorna um valor igual ou superior a 5', () => {
    expect(handlerElephants('popularity')).toBeGreaterThanOrEqual(5);
  });
  it('verifica se ao passar o parametro popularity, retorna um valor igual ou superior a 5', () => {
    const notContaing = ['Monday'];
    expect(handlerElephants('availability')).toEqual(expect.not.arrayContaining(notContaing));
  });
  it('verifica se ao passar parametros invalidos retorna null', () => {
    expect(handlerElephants('qualquercoisa')).toBe(null);
  });
});
