import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente FavoritePokemons.js', () => {
  it('Se é exibida na tela "No Favorite pokemon found" se nao houver pokemons favoritos',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/favorites');
      const paragraph = screen.getByText(/No favorite pokemon found/i);
      expect(paragraph).toBeInTheDocument();
    });

  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const bugClass = screen.getByText(/bug/i);
    userEvent.click(bugClass);
    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();
    const moreDetails = screen.getByText(/more details/i);
    userEvent.click(moreDetails);
    const summary = screen.getByRole('heading', {
      name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();

    const favorite = screen.getByText(/pokémon favoritado/i);
    userEvent.click(favorite);
    const linkFavoritePokemons = screen.getByRole('link',
      { name: /favorite pokémons/i });
    userEvent.click(linkFavoritePokemons);
    const favoriteTitle = screen.getByRole('heading', { name: /favorite pokémons/i });
    const favoritePokemon = screen.getByText('Caterpie');
    expect(favoriteTitle).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
  });
});
