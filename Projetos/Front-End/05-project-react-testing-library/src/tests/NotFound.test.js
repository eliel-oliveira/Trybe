import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente NotFound.js', () => {
  it('Teste se a página contem um heading h2 com o texto Page requested not found 😭',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/naoExiste');
      const textNotFound = screen.getByRole('heading',
        {
          name: /page requested not found/i,
          level: 2,
        });
      expect(textNotFound).toBeInTheDocument();
    });

  it('teste img', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/naoExiste');
    const image = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
