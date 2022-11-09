import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex;', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const paragraph = screen.getByText(/this application simulates a pokédex/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2 });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const paragraph1 = screen.getByText(/this application simulates a pokédex/i);
    const paragraph2 = screen.getByText(/one can filter Pokémons by type/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const image = screen.getByRole('img', {
      name: 'Pokédex' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

// Referencia da propriedade img, src https://stackoverflow.com/questions/65947682/expect-tohaveattribute-is-not-a-function-why
