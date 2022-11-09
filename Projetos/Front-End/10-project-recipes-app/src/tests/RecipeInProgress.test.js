import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Foods from '../pages/Foods';
import App from '../App'
import renderWithRouter from './helpers/renderWithRouter';
import { drinks, foods, foodsCategory, drinksCategory, bickmack} from './helpers/apiMock';
import GlobalProvider from '../context/GlobalProvider';
import { act } from 'react-dom/test-utils';
import Drinks from '../pages/Drinks';
// import INITIAL_STATE from './helpers/initialStateMock'
function mockFetch () {
  jest.spyOn(global, 'fetch').mockImplementation( async (url)=> {
    if(url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=53013') {
        return {
            json:async () => bickmack
      }
    }
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
    const {history} = await  (waitFor (() => renderWithRouter(<GlobalProvider><App/></GlobalProvider>)))
    expect(history.location.pathname).toBe('/')
    await act (async() => 
    history.push('/foods/53013/in-progress')
    )
    // expect(history.location.pathname).toBe('/foods/53013/in-progress');
    // expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=53013'); 
    // const imgBig = screen.getByRole('img', { name: /beef undefined/i })
    // const titleBig = screen.getByRole('heading', { name: /big mac/i })
    // const firstIngredient = screen.getByText(/minced beef/i)
    // const firstCheck = screen.getByRole('checkbox', { name: /minced beef/i })
    // const finishRecipe = screen.getByRole('button', { name: /finalizar receita/i })
    // const favoriteIco = screen.getByTestId('favorite-btn')
    // const shareIco = await screen.findByTestId('share-btn')
    // expect(imgBig).toBeInTheDocument()
    // expect(titleBig).toBeInTheDocument()
    // expect(firstIngredient).toBeInTheDocument()
    // expect(firstCheck).toBeInTheDocument()
    // expect(finishRecipe).toBeInTheDocument()
    // expect(shareIco).toBeInTheDocument()
    // expect(favoriteIco).toBeInTheDocument()
    // expect(firstCheck).not.toBeChecked()
    // userEvent.click(firstCheck)
    // expect(firstCheck).toBeChecked()
    screen.logTestingPlaygroundURL() 
  });
})
