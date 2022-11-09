import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('Farewell, front-end', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  // const linkElement = screen.getByText(/TRYBE/i);
  // expect(linkElement).toBeInTheDocument();
});
