import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Testa a página Login', () => {
  test('Testa a renderização do componente', () => {
    const { container } = render(<BrowserRouter><App /></BrowserRouter>);
    const form = container.querySelector('.login');
    expect(form).toBeInTheDocument();
  });

  test('Testa se o botão é habilitado corretamente', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByTestId('password-input');
    const btn = screen.getByRole('button');
    userEvent.type(emailInput, 'nome@nome.com');
    userEvent.type(passwordInput, '1234567');
    expect(btn.disabled).toBe(false);
    userEvent.click(btn);
    const path = document.location.pathname;
    console.log(path);
    expect(path).toBe('/foods');
  });
});
