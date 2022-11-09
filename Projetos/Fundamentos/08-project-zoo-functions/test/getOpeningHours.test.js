const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  it('Se não receber parametros retorna objeto com horas', () => {
    const expected = {
      Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 },
    };
    expect(getOpeningHours()).toEqual(expected);
  });
  it('Verifica se ao receber parametros Monday e 09:00-AM retorna "The zoo is closed"', () => {
    const expected = 'The zoo is closed';
    expect(getOpeningHours('Monday', '09:00-AM')).toEqual(expected);
  });
  it('Verifica se ao receber parametros Tuesday e 09:00AM retorna "The zoo is open"', () => {
    const expected = 'The zoo is open';
    expect(getOpeningHours('Tuesday', '09:00-AM')).toEqual(expected);
  });
  it('Verifica se ao receber parametros Wednesday e 09:00PM retorna "The zoo is closed"', () => {
    const expected = 'The zoo is closed';
    expect(getOpeningHours('Wednesday', '09:00-PM')).toEqual(expected);
  });
  it('Verifica se ao receber parametro Friday e 09:00-ZM retorna um erro de exceção com a mensagem \'The abbreviation must be \'AM\' or \'PM\'\'', () => {
    expect(() => getOpeningHours('Friday', '09:00-ZM')).toThrow('The abbreviation must be \'AM\' or \'PM\'');
  });
  it('Verifica se ao receber o parametro Saturday e C9:00-AM retorna um erro de exceção com a mensagem \'The hour should represent a number\'', () => {
    expect(() => getOpeningHours('Saturday', 'C9:00-AM')).toThrow('The hour should represent a number');
  });
  it('Verifica se ao receber parametro Sunday e 09:c0-AM retorna um erro de exceção com a mensagem \'The minutes should represent a number\'', () => {
    expect(() => getOpeningHours('Sunday', '09:c0-AM')).toThrow('The minutes should represent a number');
  });
  it('Verifica se ao passar um dia invalido retorna um erro de exceção com a mensagem  "The day must be valid. Example: Monday"', () => {
    expect(() => getOpeningHours('mmonday', '09:c0-AM')).toThrow('The day must be valid. Example: Monday');
  });
  it('Verica se ao passar uma hora invalida retorna um erro de exceção The hour must be between 0 and 12', () => {
    expect(() => getOpeningHours('Monday', '13:00-PM')).toThrow('The hour must be between 0 and 12');
  });
  it('Verifica se ao passar um minuto invalido retorna um erro de exceção The minutes must be between 0 and 59', () => {
    expect(() => getOpeningHours('Thursday', '09:60-AM')).toThrow('The minutes must be between 0 and 59');
  });
});
