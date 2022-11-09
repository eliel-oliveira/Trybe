import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente Pokemon.js', () => {
  const pikachuPage = '/pokemons/25';
  describe('Teste se é renderizado um card com as informações de determinado pokémon:',
    () => {
      it('O nome correto do pokémon deve ser mostrado na tela', () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);
        const pokemonName = screen.getByTestId('pokemon-name');
        expect(pokemonName).toBeInTheDocument();
        expect(pokemonName.textContent).toBe('Pikachu');
      });

      it('O tipo correto do pokémon deve ser mostrado na tela', () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);
        const pokemonType = screen.getByTestId('pokemon-type');
        expect(pokemonType).toBeInTheDocument();
        expect(pokemonType.textContent).toBe('Electric');
      });

      it('O peso deve ser exibido no formato Average weight: <value> <measurementUnit>',
        () => {
          const { history } = renderWithRouter(<App />);
          history.push(pikachuPage);
          const pokemonWeight = screen.getByTestId('pokemon-weight');
          expect(pokemonWeight).toBeInTheDocument();
          expect(pokemonWeight.textContent).toEqual('Average weight: 6.0 kg');
        });

      it('A imagem do pokémon deve ser exibida com atributo name e src corretos',
        () => {
          const { history } = renderWithRouter(<App />);
          history.push(pikachuPage);
          const image = screen.getByRole('img', {
            name: /pikachu sprite/i,
          });
          expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
          expect(image).toHaveAttribute('alt', 'Pikachu sprite');
        });
    });
  it('Se o card indicado na Pokédex contém um link para exibir detalhes', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', pikachuPage);
  });
  it('Teste se ao clicar no link do pokémon, é redirecionaDo para a página de detalhes',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetails);
      expect(screen.getByRole('heading', {
        name: /pikachu details/i,
      })).toBeInTheDocument();
    });
  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.entries[0].pathname).toBe('/');
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(history.entries[1].pathname).toBe(pikachuPage);
  });

  describe('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    it('O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg',
      () => {
        renderWithRouter(<App />);
        const moreDetails = screen.getByRole('link', {
          name: /more details/i,
        });
        userEvent.click(moreDetails);
        const favoritePokemon = screen.getByText(/pokémon favoritado\?/i);
        userEvent.click(favoritePokemon);
        const favoriteIcon = screen.getByRole('img', {
          name: /pikachu is marked as favorite/i,
        });
        expect(favoriteIcon).toBeInTheDocument();
        expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
      });
    it('A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite',
      () => {
        renderWithRouter(<App />);
        const moreDetails = screen.getByRole('link', {
          name: /more details/i,
        });
        userEvent.click(moreDetails);
        const favoriteIcon = screen.getByRole('img', {
          name: /pikachu is marked as favorite/i,
        });
        expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
      });
  });
});
