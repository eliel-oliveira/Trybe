import React from "react";
import { favoriteRecipes, favoriteRecipesOnlyDrinks } from "./helpers/mockLocalStorageObject";
import { render, screen } from "@testing-library/react";
import FavoriteRecipes from "../pages/FavoriteRecipes";
import GlobalContext from "../context/GlobalContext";
import { Router } from "react-router-dom";
import {createMemoryHistory} from 'history';
import { act } from "react-dom/test-utils";
import userEvent from '@testing-library/user-event';
import CardFavorite from "../components/CardFavorite";

const favPageStore = {
  headerTitle: '',
  setheaderTitle(value) {
    favPageStore.headerTitle = value;
  },
};

const mockLocalStorage = () => {
  jest.spyOn(localStorage.__proto__, 'getItem');
  jest.spyOn(localStorage.__proto__, 'setItem');
  localStorage.setItem('favoriteRecipes', favoriteRecipes);
  localStorage.__proto__.setItem = jest.fn().mockImplementation((key, value) => localStorage[key] = value);
  localStorage.__proto__.getItem = jest.fn().mockImplementation((key) => localStorage[key])
};

const history = createMemoryHistory()
history.push('/favorite-recipes')

const renderPage = () => {
  render(
    <GlobalContext.Provider value={favPageStore}>
      <Router history={history}>
        <FavoriteRecipes />
      </Router>
    </GlobalContext.Provider>
  )
}

const renderCardFavorite = () => {
  render(
    <GlobalContext.Provider value={favPageStore}>
      <Router history={history}>
        <CardFavorite props={JSON.parse(favoriteRecipes)} handleFavBtn={ () => {}} />
      </Router>
    </GlobalContext.Provider>
  )
}

describe('Tests for the FavoriteRecipes page', () => {
  it('checks if the localStorage is parsed on page mounting', () => {
    mockLocalStorage();
    act(() => renderPage())
    expect(localStorage.__proto__.getItem).toHaveBeenCalled();
  })

  it('checks if all favorite recipes are rendered', () => {
    mockLocalStorage();
    act(() => renderPage());
    const figureElements = document.querySelectorAll('figure').length;
    expect(figureElements).toBe(4);
  })

  it('checks if the foods filter btn works correctly', () => {
    mockLocalStorage();
    act(() => renderPage());
    const foodsFilterBtn =  screen.getByTestId('filter-by-food-btn');
    act(() => userEvent.click(foodsFilterBtn));
    const filteredByFood = document.querySelectorAll('figure').length;
    expect(filteredByFood).toBe(1);
  })

  it('checks if the "drink" and "all" filter btns work correctly', () => {
    mockLocalStorage();
    act(() => renderPage());
    const drinksFilterBtn =  screen.getByTestId('filter-by-drink-btn');
    act(() => userEvent.click(drinksFilterBtn));
    const filteredDrinks = document.querySelectorAll('figure').length;
    expect(filteredDrinks).toBe(3);
    // "All" filter btn:
    const allFilterBtn =  screen.getByTestId('filter-by-all-btn');
    act(() => userEvent.click(allFilterBtn));
    const filteredAll = document.querySelectorAll('figure').length;
    expect(filteredAll).toBe(4);
  })

  it('checks for the case when there is no value for the choosen filter', () => {
    // If there is no favorite 'food', for instace, nothing should be rendered:
    mockLocalStorage();
    act(() => renderPage());
    // Removing the "food" from the favorites key:
    localStorage.setItem('favoriteRecipes',favoriteRecipesOnlyDrinks);
    // Checking if no result is rendered:
    const foodsFilterBtn =  screen.getByTestId('filter-by-food-btn');
    act(() => userEvent.click(foodsFilterBtn));
    const filteredByFood = document.querySelectorAll('figure').length;
    expect(filteredByFood).toBe(0);
    // Reseting the localStorage:
    localStorage.setItem('favoriteRecipes',favoriteRecipes);
  })

  it('checks if the defavorite btns works correctly', () => {
    mockLocalStorage();
    act(() => renderPage());
    const figureElements = document.querySelectorAll('figure').length;
    expect(figureElements).toBe(4);
    // Defavorite all elements:
    const defavoriteBtns1 = screen.getByTestId('0-horizontal-favorite-btn');
    const defavoriteBtns2 = screen.getByTestId('1-horizontal-favorite-btn');
    const defavoriteBtns3 = screen.getByTestId('2-horizontal-favorite-btn');
    const defavoriteBtns4 = screen.getByTestId('3-horizontal-favorite-btn');
    act(() => userEvent.click(defavoriteBtns1));
    act(() => userEvent.click(defavoriteBtns2));
    act(() => userEvent.click(defavoriteBtns3));
    act(() => userEvent.click(defavoriteBtns4));
    // Expected to remain no figure element on the page:
    const deletedFigureElements = document.querySelectorAll('figure').length;
    expect(deletedFigureElements).toBe(0);
  })

  it('checks if the img link changes the route correctly', () => {
    act(() => renderCardFavorite());
    const imgLink = screen.getByTestId('0-horizontal-image');
    userEvent.click(imgLink);
    const {pathname} = history.location;
    expect(pathname).toBe('/drinks/11007');
  })

  it('checks if the p tag link changes the route correctly', () => {
    act(() => renderCardFavorite());
    const pLink = screen.getByTestId('0-horizontal-name');
    userEvent.click(pLink);
    const {pathname} = history.location;
    expect(pathname).toBe('/drinks/11007');
  })
})