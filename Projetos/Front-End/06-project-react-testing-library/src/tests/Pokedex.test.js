import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente Pokedex.js', () => {
  it('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const encounteredPokemons = screen.getByRole('heading',
      { name: /encountered pokémons/i, level: 2 });
    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('Se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado',
    () => {
      renderWithRouter(<App />);
      const pikachu = screen.getByText(/pikachu/i);
      const nextButton = screen.getByText(/próximo pokémon/i);
      expect(nextButton).toBeInTheDocument();
      expect(pikachu).toBeInTheDocument();
      userEvent.click(nextButton);
      const charmander = screen.getByRole('img', {
        name: /charmander sprite/i,
      });
      expect(charmander).toBeInTheDocument();
    });

  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getAllByText(/more details/i);
    expect(moreDetails).toHaveLength(1);
  });

  it('Deve existir um botão de filtragem para cada tipo de pokémon, sem repetição',
    () => {
      renderWithRouter(<App />);
      const allButtonsType = screen.getAllByTestId('pokemon-type-button');
      allButtonsType.forEach((buttonType) => {
        expect(buttonType).toBeInTheDocument();
        userEvent.click(screen.getByRole('button',
          { name: `${buttonType.textContent}` }));
        expect(buttonType.textContent)
          .toBe(screen.getByTestId('pokemon-type').textContent);
        console.log(buttonType);
      });
      // const eletricButton = screen.getAllByRole('button', {
      //   name: /electric/i,
      // });
      // const fireButton = screen.getAllByRole('button', {
      //   name: /fire/i,
      // });
      // const bugButton = screen.getAllByRole('button', {
      //   name: /bug/i,
      // });
      // const poisonButton = screen.getAllByRole('button', {
      //   name: /poison/i,
      // });
      // const psychicButton = screen.getAllByRole('button', {
      //   name: /psychic/i,
      // });
      // const normalButton = screen.getAllByRole('button', {
      //   name: /normal/i,
      // });
      // const dragonButton = screen.getAllByRole('button', {
      //   name: /dragon/i,
      // });
      // expect(eletricButton).toHaveLength(1);
      // expect(fireButton).toHaveLength(1);
      // expect(bugButton).toHaveLength(1);
      // expect(poisonButton).toHaveLength(1);
      // expect(psychicButton).toHaveLength(1);
      // expect(normalButton).toHaveLength(1);
      // expect(dragonButton).toHaveLength(1);
    });

  it('Verifica se o botão de filtragem está funcionando corretamente', () => {
    renderWithRouter(<App />);
    const buttonFire = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(buttonFire);
    const fireType = screen.getAllByText(/fire/i);
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(fireType).toHaveLength(2);
    userEvent.click(nextButton);
    expect(fireType).toHaveLength(2);
  });

  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App />);
    const buttonPsychic = screen.getByRole('button', {
      name: /psychic/i,
    });
    userEvent.click(buttonPsychic);
    const type = screen.getAllByText(/psychic/i);
    expect(type[0].innerHTML).toEqual('Psychic');
  });

  it('O botão All precisa estar sempre visível.', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();
    const normalButton = screen.getByRole('button', {
      name: /normal/i,
    });
    userEvent.click(normalButton);
    expect(buttonAll).toBeInTheDocument();
  });

  it('A Pokédex contém um botão com o texto All para resetar o filtro ', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    expect(screen.getByText(/ekans/i));
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(screen.getByText(/pikachu/i));
  });

  it('A Pokedéx deverá mostrar os pokémons normalmente, quando o botão all for clicado',
    () => {
      renderWithRouter(<App />);
      const buttonAll = screen.getByRole('button', {
        name: /all/i,
      });
      userEvent.click(buttonAll);
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });

  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(screen.getByText(/pikachu/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/charmander/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/caterpie/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/ekans/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/alakazam/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/mew/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/rapidash/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/snorlax/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/dragonair/i));
  });
});
