import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Foods from '../pages/Foods';
import App from '../App'
import renderWithRouter from './helpers/renderWithRouter';
import { drinks, foods, foodsCategory, drinksCategory} from './helpers/apiMock';
import GlobalProvider from '../context/GlobalProvider';
import { act } from 'react-dom/test-utils';
import Drinks from '../pages/Drinks';
// import INITIAL_STATE from './helpers/initialStateMock'
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
describe('Testa a página Login', () => {
  test('Testa se é renderizada a pagina de comidas', async () => {
    mockFetch()    
    // await act(async() => {
    // })
    await (waitFor(() => renderWithRouter(<GlobalProvider><App /></GlobalProvider>) ))
    const loginInput = screen.getByRole('textbox', { name: /email:/i })
    const loginPass = screen.getByTestId('password-input')
    const loginBtn = screen.getByRole('button', { name: /login/i })
    expect(loginBtn).toBeDisabled()
    userEvent.type(loginInput, 'recipesproject@teste.com')
    userEvent.type(loginPass, 'mypassword')
    expect(loginBtn).not.toBeDisabled()
    userEvent.click(loginBtn)
    const Title = screen.getByRole('heading', { name: /foods/i })
    expect(Title).toBeInTheDocument()
    const All =screen.getByRole('button', { name: /all/i })
    const Beef = screen.getByRole('button', { name: /beef/i })
    const Breakfast = screen.getByRole('button', { name: /breakfast/i })
    expect(All).toBeInTheDocument()
    expect(Beef).toBeInTheDocument()
    expect(Breakfast).toBeInTheDocument()
    const imgCorba = screen.getByRole('img', { name: /corba/i })
    expect(imgCorba).toBeInTheDocument()
    userEvent.click(imgCorba)
    await act(async() => {
    renderWithRouter(<GlobalProvider><App /></GlobalProvider>);
    })

  });
  
  test('Testa se é renderizada a pagina de comidas', async () => {
    mockFetch()    
    await act(async() => {
    renderWithRouter(<GlobalProvider><App /></GlobalProvider>);
    })
    const loginInput = screen.getByRole('textbox', { name: /email:/i })
    const loginPass = screen.getByTestId('password-input')
    const loginBtn = screen.getByRole('button', { name: /login/i })
    expect(loginBtn).toBeDisabled()
    userEvent.type(loginInput, 'recipesproject@teste.com')
    userEvent.type(loginPass, 'mypassword')
    expect(loginBtn).not.toBeDisabled()
    userEvent.click(loginBtn)
    const Title = screen.getByRole('heading', { name: /foods/i })
    expect(Title).toBeInTheDocument()
    const All =screen.getByRole('button', { name: /all/i })
    expect(All).toBeInTheDocument()
    const imgCorba = screen.getByRole('img', { name: /corba/i })
    expect(imgCorba).toBeInTheDocument()
    await act(async() => {
    userEvent.click(All)
    })
  });

  test('Testa se é renderizada a pagina de Drinks', async () => {
    mockFetch();
    await act(async() => {
    renderWithRouter(<GlobalProvider><App /></GlobalProvider>);
    })
    const loginInput = screen.getByRole('textbox', { name: /email:/i })
    const loginPass = screen.getByTestId('password-input')
    const loginBtn = screen.getByRole('button', { name: /login/i })
    expect(loginBtn).toBeDisabled()
    userEvent.type(loginInput, 'recipesproject@teste.com')
    userEvent.type(loginPass, 'mypassword')
    expect(loginBtn).not.toBeDisabled()
    userEvent.click(loginBtn)
    const Title = screen.getByRole('heading', { name: /foods/i })
    expect(Title).toBeInTheDocument()
    const drinksButton = screen.getByRole('img', { name: /drinks icon/i })
    userEvent.click(drinksButton)
    const firstDrink = screen.getByRole('img', { name: /abc/i })
    expect(firstDrink).toBeInTheDocument()
    
    // screen.logTestingPlaygroundURL();
  });

  test('Testa se é renderizada a pagina de drinks e filtra os items', async () => {
    mockFetch()    
    await act(async() => {
    renderWithRouter(<GlobalProvider><App /></GlobalProvider>);
    })
    const loginInput = screen.getByRole('textbox', { name: /email:/i })
    const loginPass = screen.getByTestId('password-input')
    const loginBtn = screen.getByRole('button', { name: /login/i })
    expect(loginBtn).toBeDisabled()
    userEvent.type(loginInput, 'recipesproject@teste.com')
    userEvent.type(loginPass, 'mypassword')
    expect(loginBtn).not.toBeDisabled()
    userEvent.click(loginBtn)
    const Title = screen.getByRole('heading', { name: /foods/i })
    expect(Title).toBeInTheDocument()
    const drinksButton = screen.getByRole('img', { name: /drinks icon/i })
    userEvent.click(drinksButton)
    const firstDrink = screen.getByRole('img', { name: /abc/i })
    const filterCocktail = screen.getByRole('button', { name: /cocktail/i })
    expect(firstDrink).toBeInTheDocument()
    await act(async() => {
    userEvent.click(filterCocktail)
    })
    await act(async() => {
      userEvent.click(filterCocktail)
      })
    // screen.logTestingPlaygroundURL();
  });
});
