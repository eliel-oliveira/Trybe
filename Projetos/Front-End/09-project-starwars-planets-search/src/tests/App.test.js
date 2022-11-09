import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import apiMock from './helpers/apiMock'
import userEvent from '@testing-library/user-event';
describe('testes', ()=> {
test('I am your test igual a', async () => { global.fetch = jest.fn(
    function(url) {
      return Promise.resolve({ json: () => Promise.resolve(apiMock) })
    }
  );
  render(<App />);
  const title = await screen.findByRole('heading', { name: /projeto star wars \- trybe/i })
  expect(title).toBeInTheDocument()
  const selectColumn = screen.getByTestId('column-filter')
  const selectComparison = screen.getByTestId('comparison-filter')
  const inputValue = screen.getByTestId('value-filter')
  expect(selectColumn).toBeInTheDocument()
  expect(selectComparison).toBeInTheDocument()
  expect(inputValue).toBeInTheDocument()
  userEvent.selectOptions(selectComparison,'igual a')
  userEvent.selectOptions(selectColumn,'diameter')
  userEvent.type(inputValue, '12500')
  expect(selectColumn).toHaveTextContent('diameter')
  expect(selectComparison).toHaveTextContent('igual a')
  expect(inputValue).toHaveAttribute('value', '012500')
  const tatooinePlanet = screen.getByRole('cell', { name: /tatooine/i })
  expect(tatooinePlanet).toBeInTheDocument()
  const findButton = screen.getByRole('button', { name: /filtrar/i })
  userEvent.click(findButton)
  const planet = screen.getByRole('cell', { name: /alderaan/i })
  expect(planet).toBeInTheDocument()
  expect(tatooinePlanet).not.toBeInTheDocument()
});

test('I am your test maior que', async () => {
  global.fetch = jest.fn(
    function(url) {
      return Promise.resolve({ json: () => Promise.resolve(apiMock) })
    }
  );
  render(<App />);
  const title = await screen.findByRole('heading', { name: /projeto star wars \- trybe/i })
  expect(title).toBeInTheDocument()
  const selectColumn = screen.getByTestId('column-filter')
  const selectComparison = screen.getByTestId('comparison-filter')
  const inputValue = screen.getByTestId('value-filter')
  expect(selectColumn).toBeInTheDocument()
  expect(selectComparison).toBeInTheDocument()
  expect(inputValue).toBeInTheDocument()
  userEvent.selectOptions(selectComparison,'maior que')
  userEvent.selectOptions(selectColumn,'orbital_period')
  userEvent.type(inputValue, '400')
  expect(selectColumn).toHaveTextContent('orbital_period')
  expect(selectComparison).toHaveTextContent('maior que')
  expect(inputValue).toHaveAttribute('value', '0400')
  const tatooinePlanet = screen.getByRole('cell', { name: /tatooine/i })
  expect(tatooinePlanet).toBeInTheDocument()
  const findButton = screen.getByRole('button', { name: /filtrar/i })
  userEvent.click(findButton)
  const planet = screen.getByRole('cell', { name: /Bespin/i })
  expect(planet).toBeInTheDocument()
  expect(tatooinePlanet).not.toBeInTheDocument()
  const buttonSort = screen.getByRole('button', { name: /ordenar/i })
  userEvent.selectOptions(screen.getByRole('combobox', { name: /ordernar/i }), 'diameter')
  userEvent.click(screen.getByText(/ascendente/i))
  userEvent.click(screen.getByText(/descedente/i))
  userEvent.click(screen.getByText(/ascendente/i))
  userEvent.click(buttonSort)
  userEvent.click(screen.getByRole('button', { name: /remover filtros/i }))
});

test('I am your test menor que', async () => { global.fetch = jest.fn(
    function(url) {
      return Promise.resolve({ json: () => Promise.resolve(apiMock) })
    }
  );
  render(<App />);
  const title = await screen.findByRole('heading', { name: /projeto star wars \- trybe/i })
  expect(title).toBeInTheDocument()
  const selectColumn = screen.getByTestId('column-filter')
  const selectComparison = screen.getByTestId('comparison-filter')
  const inputValue = screen.getByTestId('value-filter')
  expect(selectColumn).toBeInTheDocument()
  expect(selectComparison).toBeInTheDocument()
  expect(inputValue).toBeInTheDocument()
  userEvent.selectOptions(selectComparison,'menor que')
  userEvent.selectOptions(selectColumn,'rotation_period')
  userEvent.type(inputValue, '20')
  expect(selectColumn).toHaveTextContent('rotation_period')
  expect(selectComparison).toHaveTextContent('maior que')
  expect(inputValue).toHaveAttribute('value', '020')
  const tatooinePlanet = screen.getByRole('cell', { name: /tatooine/i })
  expect(tatooinePlanet).toBeInTheDocument()
  const findButton = screen.getByRole('button', { name: /filtrar/i })
  userEvent.click(findButton)
  const planet = screen.getByRole('cell', { name: /Bespin/i })
  expect(planet).toBeInTheDocument()
  expect(tatooinePlanet).not.toBeInTheDocument()
  const buttonSort = screen.getByRole('button', { name: /ordenar/i })
  userEvent.click(buttonSort)
});

test('I am your last test', async () => { global.fetch = jest.fn(
  function(url) {
    return Promise.resolve({ json: () => Promise.resolve(apiMock) })
  }
);
render(<App />);
const title = await screen.findByRole('heading', { name: /projeto star wars \- trybe/i })
expect(title).toBeInTheDocument()
const selectColumn = screen.getByTestId('column-filter')
const selectComparison = screen.getByTestId('comparison-filter')
const inputValue = screen.getByTestId('value-filter')
expect(selectColumn).toBeInTheDocument()
expect(selectComparison).toBeInTheDocument()
expect(inputValue).toBeInTheDocument()
const filterInput = screen.getByTestId('name-filter')
userEvent.type(filterInput,'aldera')
});
// screen.logTestingPlaygroundURL()

})

// beforeEach(() => {
//   jest.spyOn(global, 'fetch')
//   .mockImplementation(() => Promise.resolve({
//   status: 200,
//   ok: true,
//   json: () => Promise.resolve(testData),
//   }));
//   });

//   afterEach(() => {
//   jest.clearAllMocks();
//   });
