import React from 'react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import GlobalContext from '../context/GlobalContext';
import App from '../App';
import MockMeal from '../services/MockMeal';
import renderWithRouter from './helpers/renderWithRouter';
import { drinks, foods, foodsCategory, drinksCategory} from './helpers/apiMock';
import GlobalProvider from '../context/GlobalProvider';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const ingSearchRadio = 'ingredient-search-radio';
const nameSearchRadio = 'name-search-radio';
const flSearchRadio = 'first-letter-search-radio';
const execSearchBtn = 'exec-search-btn';
const drinksBottomBtn = 'drinks-bottom-btn';
const foodBottomBtn = 'food-bottom-btn';

describe('Verifica a cobertura do componente SearchBar', () => {
  const mockJest = (url) => {
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
          json: async () => MockMeal
        }
      }
    })
  };
  global.alert = jest.fn();
  afterEach(() => { jest.clearAllMocks(); cleanup(); });
  beforeEach(() => mockJest());
  const store = {
    recipesAPIReturn: [],
    setRecipesAPIReturn(param) {
      store.recipesAPIReturn = param;
    },
    headerTitle: { title: '', search: true },
    setheaderTitle(param) {
      store.headerTitle = param;
    },
    apiDrinks: [],
    apiFoods: [],
  };
  test('Testa a renderização do componente', async () => {
    const {history} = await  (waitFor (() => renderWithRouter(<App/>)))
    expect(history.location.pathname).toBe('/')
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    const email = 'email@pessoa.com';
    const password = '1234567';
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/foods');
    const searchButton = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButton);
    const inputText = screen.getByTestId(searchInput);
    const ingredientRadio = screen.getByTestId(ingSearchRadio);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    const firstLetteradio = screen.getByTestId(flSearchRadio);
    const buton = screen.getByTestId(execSearchBtn);
    expect(inputText).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetteradio).toBeInTheDocument();
    expect(buton).toBeInTheDocument();
    cleanup();
  });
  test('Testa se a busca na API é feita corretamente pelo ingrediente', async () => {    
    const {history} = await  (waitFor (() => renderWithRouter(<App/>)))
    expect(history.location.pathname).toBe('/')
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    const email = 'email@pessoa.com';
    const password = '1234567';
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(button);
    const searchButton = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButton);
    const inputText = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    const buton = screen.getByTestId(execSearchBtn);
    userEvent.type(inputText, 'Arrabiata');
    userEvent.click(nameRadio);
    userEvent.click(buton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    cleanup();
    screen.logTestingPlaygroundURL()
  });

  test('Testa a filtro dos radios buttons Food', async () => {
    const {history} = await  (waitFor (() => renderWithRouter(<App/>)))
    expect(history.location.pathname).toBe('/')
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    const email = 'email@pessoa.com';
    const password = '1234567';
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(button);
    const searchButton = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButton);
    const inputText = screen.getByTestId(searchInput);
    const ingredientRadio = screen.getByTestId(ingSearchRadio);
    const buton = screen.getByTestId(execSearchBtn);
    userEvent.type(inputText, 'chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(buton);
    expect(global.fetch).toHaveBeenCalled();
    cleanup();
  });
  test('Testa a filtro dos radios buttons Drinks', async () => {
    const {history} = await  (waitFor (() => renderWithRouter(<App/>)))
    expect(history.location.pathname).toBe('/')
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    const email = 'email@pessoa.com';
    const password = '1234567';
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(button);
    const changeToDrinks = screen.getByTestId(drinksBottomBtn);
    userEvent.click(changeToDrinks);
    expect(history.location.pathname).toBe('/drinks');
    const searchButton = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButton);
    const inputText = screen.getByTestId(searchInput);
    const firstLetteradio = screen.getByTestId(flSearchRadio);
    const buton = screen.getByTestId(execSearchBtn);
    userEvent.type(inputText, 'l');
    userEvent.click(firstLetteradio);
    userEvent.click(buton);
    expect(global.fetch).toHaveBeenCalled();
    cleanup();
  });
  test('Testa a filtro dos radios buttons Foods (firstLetter)', async () => {
    const {history} = await  (waitFor (() => renderWithRouter(<App/>)))
    expect(history.location.pathname).toBe('/')
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    const email = 'email@pessoa.com';
    const password = '1234567';
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(button);
    const changeToFoods = screen.getByTestId(foodBottomBtn);
    userEvent.click(changeToFoods);
    expect(history.location.pathname).toBe('/foods');
    const searchButton = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButton);
    const inputText = screen.getByTestId(searchInput);
    const firstLetteradio = screen.getByTestId(flSearchRadio);
    const buton = screen.getByTestId(execSearchBtn);
    userEvent.type(inputText, 'l');
    userEvent.click(firstLetteradio);
    userEvent.click(buton);
    expect(global.fetch).toHaveBeenCalled();
    cleanup();
  });
  test('Testa a filtro dos radios buttons Drinks (firstLetter - none)', async () => {
    const {history} = await  (waitFor (() => renderWithRouter(<App/>)))
    expect(history.location.pathname).toBe('/')
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    const email = 'email@pessoa.com';
    const password = '1234567';
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(button);
    const changeToDrinks = screen.getByTestId(drinksBottomBtn);
    userEvent.click(changeToDrinks);
    expect(history.location.pathname).toBe('/drinks');
    const searchButton = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButton);
    const firstLetter = screen.getByTestId(flSearchRadio);
    const buton = screen.getByTestId(execSearchBtn);
    act(() => { userEvent.click(firstLetter); });
    act(() => { userEvent.click(buton); });
    expect(global.alert).toHaveBeenCalled();
    cleanup();
  });

  test('Testa a filtro dos radios buttons Foods (firstLetter - none)', async () => {
    const {history} = await  (waitFor (() => renderWithRouter(<App/>)))
    expect(history.location.pathname).toBe('/')
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    const email = 'email@pessoa.com';
    const password = '1234567';
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(button);
    const changeToFoods = screen.getByTestId(foodBottomBtn);
    userEvent.click(changeToFoods);
    expect(history.location.pathname).toBe('/foods');
    const searchButton = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButton);
    const firstLetter = screen.getByTestId(flSearchRadio);
    const buton = screen.getByTestId(execSearchBtn);
    act(() => { userEvent.click(firstLetter); });
    act(() => { userEvent.click(buton); });
    expect(global.fetch).not.toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=lemon');
    expect(global.fetch).not.toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=lemon');
    expect(global.fetch).not.toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=lemon');
    expect(global.alert).toHaveBeenCalled();
  });
  test('Testa a filtro dos radios buttons Drinks (ingredients)', async () => {
    const {history} = await  (waitFor (() => renderWithRouter(<App/>)))
    expect(history.location.pathname).toBe('/')
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    const email = 'email@pessoa.com';
    const password = '1234567';
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(button);
    const changeToDrinks = screen.getByTestId(drinksBottomBtn);
    userEvent.click(changeToDrinks);
    expect(history.location.pathname).toBe('/drinks');
    const searchButton = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButton);
    const inputText = screen.getByTestId(searchInput);
    const ingredientsRadio = screen.getByTestId(ingSearchRadio);
    const buton = screen.getByTestId(execSearchBtn);
    userEvent.type(inputText, 'lemon');
    userEvent.click(ingredientsRadio);
    userEvent.click(buton);
    expect(global.fetch).toHaveBeenCalled();
    const nameRadio = screen.getByTestId(nameSearchRadio);
    userEvent.type(inputText, 'vodka');
    userEvent.click(nameRadio);
    userEvent.click(buton);
    expect(global.fetch).toHaveBeenCalled();
  });
  test('Testa a filtro dos radios buttons Drinks(no selection)', async () => {
    const {history} = await  (waitFor (() => renderWithRouter(<App/>)))
    expect(history.location.pathname).toBe('/')
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    const email = 'email@pessoa.com';
    const password = '1234567';
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(button);
    const changeToDrinks = screen.getByTestId(drinksBottomBtn);
    userEvent.click(changeToDrinks);
    expect(history.location.pathname).toBe('/drinks');
    const searchButton = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButton);
    const inputText = screen.getByTestId(searchInput);
    const buton = screen.getByTestId(execSearchBtn);
    userEvent.type(inputText, 'vodka');
    act(() => userEvent.click(buton));
    expect(global.fetch).not.toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka');
    expect(global.fetch).not.toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka');
    expect(global.fetch).not.toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=vodka');
    expect(global.alert).toHaveBeenCalled();
  });
  test('Testa a filtro dos radios buttons Foods(no selection)', async () => {
    const {history} = await  (waitFor (() => renderWithRouter(<App/>)))
    expect(history.location.pathname).toBe('/')
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    const email = 'email@pessoa.com';
    const password = '1234567';
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(button);
    const changeToFoods = screen.getByTestId(foodBottomBtn);
    userEvent.click(changeToFoods);
    expect(history.location.pathname).toBe('/foods');
    const searchButton = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButton);
    const inputText = screen.getByTestId(searchInput);
    const ing = screen.getByTestId(ingSearchRadio);
    const name = screen.getByTestId(nameSearchRadio);
    const fl = screen.getByTestId(flSearchRadio);
    const buton = screen.getByTestId(execSearchBtn);
    userEvent.type(inputText, 'chicken');
    act(() => userEvent.click(buton));
    expect(global.fetch).not.toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka');
    expect(global.fetch).not.toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka');
    expect(global.fetch).not.toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=vodka');
    expect(global.alert).toHaveBeenCalled();
  });
  
  it('Testa a filtro dos radios buttons Foods(no selection)', async () => {
    const {history} = await  (waitFor (() => renderWithRouter(<GlobalProvider><App/></GlobalProvider>)))
    expect(history.location.pathname).toBe('/')
    history.push('/foods')
    expect(history.location.pathname).toBe('/foods');
    const SearchIcon = screen.getByTestId('search-top-btn')
    userEvent.click(SearchIcon)
    const SearchInput = screen.getByRole('textbox')
    expect(SearchInput).toBeInTheDocument()
    await act(async() => userEvent.type(SearchInput, 'xablau'))
    // await waitFor(() => )
    // expect(searchInput).toHaveTextContent('xablau')
    const RadioName = screen.getByRole('radio', { name: /name/i })
    userEvent.click(RadioName)
    expect(RadioName).toBeChecked()
    const PesquisarButton = screen.getByRole('button', { name: /pesquisar/i })
    await act(async () => 
      userEvent.click(PesquisarButton)
    )
    screen.logTestingPlaygroundURL()
    
  });
});
