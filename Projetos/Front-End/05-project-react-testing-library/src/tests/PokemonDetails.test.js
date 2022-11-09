import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

const pikachuPage = '/pokemons/25';
describe('Teste o componente PokemonDetails.js', () => {
  it('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuPage);
      const pokemonDetails = screen.getByRole('heading', {
        name: /pikachu details/i,
      });
      expect(pokemonDetails).toBeInTheDocument();
    });

  it('Não deve existir o link de navegação para os detalhes do pokémon selecionado',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(moreDetails);
      expect(moreDetails).not.toBeInTheDocument();
    });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuPage);
    const summary = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um parágrafo com o resumo do pokemon',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuPage);
      const paragraph = screen.getByText(/this intelligent pokémon roasts hard berries/i);
      expect(paragraph).toBeInTheDocument();
    });
  describe('Se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    it('Na seção de detalhes deverá existir um heading h2 com Game Locations of <name>',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);
        const gameLocationsTitle = screen.getByRole('heading', {
          name: /game locations of pikachu/i,
        });
        expect(gameLocationsTitle).toBeInTheDocument();
      });
    it('Todas as localizações do pokémon devem ser mostradas na seção de detalhes',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);
        const pokemonName = screen.getByTestId('pokemon-name').textContent;
        expect(pokemonName).toEqual('Pikachu');
        const pokemonType = screen.getByTestId('pokemon-type').textContent;
        expect(pokemonType).toEqual('Electric');
        const pokemonWeight = screen.getByTestId('pokemon-weight').textContent;
        expect(pokemonWeight).toEqual('Average weight: 6.0 kg');
      });
    it('Será exibido o nome da localização e uma imagem do mapa em cada localização',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);
        const locationName1 = screen.getByText(/kanto viridian forest/i);
        expect(locationName1).toBeInTheDocument();
        const locationName2 = screen.getByText(/kanto power plant/i);
        expect(locationName2).toBeInTheDocument();
        const locationMap = screen.getAllByAltText(/pikachu location/i);
        expect(locationMap).toHaveLength(2);
      });
    it('A imagem da localização deve ter um atributo src com a URL da localização',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);
        const maps = screen.getAllByAltText(/pikachu location/i);
        expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
        expect(maps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
      });
    it('A imagem da localização deve ter um atributo alt com o texto <name> location',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);
        const maps = screen.getAllByAltText(/pikachu location/i);
        expect(maps[0]).toHaveAttribute('alt', 'Pikachu location');
        expect(maps[1]).toHaveAttribute('alt', 'Pikachu location');
      });
  });
  describe('Teste se o usuário pode favoritar um pokémon através da página de detalhes:',
    () => {
      it('A página deve exibir um checkbox que permite favoritar o pokémon;', () => {
        const { history } = renderWithRouter(<App />);
        history.push(pikachuPage);
        const favoriteCheckbox = screen.getByRole('checkbox',
          { name: /pokémon favoritado\?/i });
        expect(favoriteCheckbox).toBeInTheDocument();
      });
      it('Cliques alternados adicionar e remover o pokémon da lista de favoritos',
        () => {
          const { history } = renderWithRouter(<App />);
          history.push(pikachuPage);
          const favoriteCheckbox = screen.getByRole('checkbox',
            { name: /pokémon favoritado\?/i });
          expect(favoriteCheckbox).toBeInTheDocument();
          userEvent.click(favoriteCheckbox);
          const starIcon = screen.getByRole('img', {
            name: /pikachu is marked as favorite/i,
          });
          expect(starIcon).toBeInTheDocument();
          userEvent.click(favoriteCheckbox);
          expect(starIcon).not.toBeInTheDocument();
        });
      it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
        const { history, container } = renderWithRouter(<App />);
        history.push(pikachuPage);
        const checkFavorite = container.querySelector('form');
        expect(checkFavorite.textContent).toEqual('Pokémon favoritado?');
      });
    });
});
