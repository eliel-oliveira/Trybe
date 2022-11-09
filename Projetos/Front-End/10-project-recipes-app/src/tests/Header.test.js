import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página Login', () => {
  test('Testa a renderização da Pagina Food', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
  });

  test('Testa se ao clicar no icone Search, o input com data-testid é exibido', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchIcon = screen.getByRole('img', {
      name: /searchicon/i,
    });
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
  });
});
