import React from 'react';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import { render } from '@testing-library/react';

function withRouter(component, history) {
  return (   
    <BrowserRouter>
      <Router history={ history }>
        { component }
      </Router>
    </BrowserRouter>  
  );
}

function renderWithRouter(
  component,
  {
    initialPath = '/',
    history = createMemoryHistory([initialPath]),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

export default renderWithRouter;
