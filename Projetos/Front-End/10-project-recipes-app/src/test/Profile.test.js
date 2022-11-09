import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

const emailTest = 'nome@nome.com';

test('Testa se o email aparece na tela', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByTestId('password-input');
  const btn = screen.getByRole('button');
  userEvent.type(emailInput, emailTest);
  userEvent.type(passwordInput, '1234567');
  userEvent.click(btn);

  const linkProfile = screen.getAllByRole('link');
  userEvent.click(linkProfile[0]);
  const email = screen.getByTestId('profile-email');
  expect(email).toBeInTheDocument();
  expect(email).toHaveTextContent(emailTest);
});

test('Testa se o botão Done Recipes redireciona para pagina correta', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const btnDone = screen.getByRole('button', { name: /Done Recipes/i });
  userEvent.click(btnDone);
  expect(document.location.pathname).toBe('/done-recipes');
});

test('Testa se o botão Favorite Recipes redireciona para pagina correta', () => {
  render(<BrowserRouter><App /></BrowserRouter>);

  const linkProfile = screen.getByRole('link');
  userEvent.click(linkProfile);

  const btnDone = screen.getByRole('button', { name: /Favorite Recipes/i });
  userEvent.click(btnDone);
  expect(document.location.pathname).toBe('/favorite-recipes');
});

test('Testa se o botão logout redireciona para pagina correta', () => {
  render(<BrowserRouter><App /></BrowserRouter>);

  const linkProfile = screen.getByRole('link');
  userEvent.click(linkProfile);

  const btnDone = screen.getByRole('button', { name: /Logout/i });
  userEvent.click(btnDone);
  expect(document.location.pathname).toBe('/');
});
