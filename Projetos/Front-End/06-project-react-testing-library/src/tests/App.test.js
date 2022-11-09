import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes componente app', () => {
  it('Verifica se a página contém os links "Home, About, Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  it('Se ao clicar no link Home, é redirecionado para página inicial', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const homeTitle = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(homeTitle).toBeInTheDocument();
  });

  it('Se ao clicar no link About, é redirecionado para página About Pokédex', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Se ao clicar no link Favorite Pokémons, é redirecionado para Favorite pokémons',
    () => {
      renderWithRouter(<App />);
      const linkFavoritePokemons = screen.getByRole('link',
        { name: /favorite pokémons/i });
      userEvent.click(linkFavoritePokemons);
      const favoritePokemons = screen.getByRole('heading',
        { name: /Favorite pokémons/i });
      expect(favoritePokemons).toBeInTheDocument();
    });

  it('Se é redirecionado para pagina Not Found ao entrar em uma url desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/naoExiste');
    const textNotFound = screen.getByRole('heading',
      { name: /page requested not found/i });
    expect(textNotFound).toBeInTheDocument();
  });
});
