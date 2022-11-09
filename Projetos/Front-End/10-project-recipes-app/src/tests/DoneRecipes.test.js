import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { drinks, foods, foodsCategory, drinksCategory} from './helpers/apiMock';
import { mockLocalStorage } from './helpers/mockFunctions';
import GlobalProvider from '../context/GlobalProvider';
import GlobalContext from '../context/GlobalContext';
import { Router } from "react-router-dom";
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DoneRecipes from '../pages/DoneRecipes'
import { createMemoryHistory } from 'history' 
import { act } from 'react-dom/test-utils';

import { doneRecipes2 } from './helpers/mockLocalStorageObject';

function mockFetch () {
  jest.spyOn(global, 'fetch').mockImplementation( async (url)=> {
    if(url ==='https://www.themealdb.com/api/json/v1/1/search.php?s=') {        
      return {
        json: async () => foods
      }
    } if (url ==='https://www.themealdb.com/api/json/v1/1/list.php?c=list' ){
      return {
        json: async () => foodsCategory
      }
    } if ( url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='){
      return {
        json: async () => drinks
      }
    } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'){
      return {
        json: async () => drinksCategory
      }
    } if(url === 'https://www.themealdb.com/api/json/v1/1/${endpoint}') {
      return {
        json: async () => foods
      }
    } else {
      return {
        json: async () => drinks
      }
    }
  })
}

const history = createMemoryHistory()

const store = { 
  setheaderTitle() {return null},
  headerTitle: '',
 }

const renderPage = () => {
  render(
    <GlobalContext.Provider value={ store }>
      <Router history={history}>
        <DoneRecipes />
      </Router>
    </GlobalContext.Provider>
  )
}



describe('Verifica a cobertura da Tela de Receitas Feitas', () => {
  test('Testa a renderização do componente', async () => {
    mockFetch()
    const {history} = await (waitFor (() => renderWithRouter(<GlobalProvider><App/></GlobalProvider>)))
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    const email = 'email@pessoa.com';
    const password = '1234567';

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(button);

    const profileBtn = screen.getByTestId('profile-top-btn')
    userEvent.click(profileBtn);

    const boneRecipesBtn = screen.getByTestId('profile-done-btn')
    userEvent.click(boneRecipesBtn);
    // history.push('/done-recipes');
    expect(history.location.pathname).toBe('/done-recipes');

    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
    const filterFoodBtn = screen.getByTestId('filter-by-food-btn');
    const filterDrinksBtn = screen.getByTestId('filter-by-drink-btn');
    const titleSctionText = screen.getByText('Done Recipes');

    expect(filterAllBtn).toBeInTheDocument();
    expect(filterFoodBtn).toBeInTheDocument();
    expect(filterDrinksBtn).toBeInTheDocument();
    expect(titleSctionText).toBeInTheDocument();
    screen.logTestingPlaygroundURL()
  });

  test('Testa filtro de comida', async () => {
    screen.logTestingPlaygroundURL()
    mockFetch()
    mockLocalStorage('doneRecipes', doneRecipes2)

    const {history} = await (waitFor (() => renderWithRouter(<GlobalProvider><App/></GlobalProvider>)))
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    const email = 'email@pessoa.com';
    const password = '1234567';

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(button);

    const profileBtn = screen.getByTestId('profile-top-btn')
    userEvent.click(profileBtn);

    const boneRecipesBtn = screen.getByTestId('profile-done-btn')
    userEvent.click(boneRecipesBtn);

    expect(history.location.pathname).toBe('/done-recipes');

    const filterFoodBtn = screen.getByTestId('filter-by-food-btn');
    userEvent.click(filterFoodBtn);

    const Cart = screen.getAllByRole('link').length;

    expect(Cart).toBe(2);
  });

  test('Testa filtro de comida', async () => {
    mockLocalStorage('doneRecipes', doneRecipes2)
    // console.log(localStorage.getItem('doneRecipes'));
    act(() => renderPage())

    // const {history} = await (waitFor (() => renderWithRouter(<GlobalProvider><App/></GlobalProvider>)))
    // const emailInput = screen.getByTestId('email-input');
    // const passwordInput = screen.getByTestId('password-input');
    // const button = screen.getByTestId('login-submit-btn');
    // const email = 'email@pessoa.com';
    // const password = '1234567';

    // userEvent.type(emailInput, email);
    // userEvent.type(passwordInput, password);
    // userEvent.click(button);

    // const profileBtn = screen.getByTestId('profile-top-btn')
    // userEvent.click(profileBtn);

    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
  
    userEvent.click(filterAllBtn);
  
    screen.logTestingPlaygroundURL()

    const Cart = screen.getAllByRole('link').length;
    // console.log(Cart)
    expect(Cart).toBe(3);
  });

  test('Testa filtro de comida', async () => {
    mockLocalStorage()
    localStorage.setItem('doneRecipes', '[]')
    act(() => renderPage())

    const filterDrinksBtn = screen.getByTestId('filter-by-drink-btn');
  
    userEvent.click(filterDrinksBtn);
  
    const Cart = screen.getAllByRole('link').length;
    expect(Cart).toBe(1);
  });
});
