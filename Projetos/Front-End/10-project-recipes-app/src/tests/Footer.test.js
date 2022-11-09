import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';
import App from '../App';

describe('Tests for the Footer component', () => {
  it('checks if the component is rendered with 2 icons', () => {
    render(<BrowserRouter><Footer /></BrowserRouter>);
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    const mealsIcon = screen.getByTestId('food-bottom-btn');
    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();
  });

  it('checks if by clicking the icons the route is updated accordingly', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinksIcon);
    expect(document.location.pathname).toBe('/drinks');

    document.location.pathname = '/';

    const mealsIcon = screen.getByTestId('food-bottom-btn');
    userEvent.click(mealsIcon);
    expect(document.location.pathname).toBe('/foods');
  });
});
