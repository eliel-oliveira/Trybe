import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GlobalProvider from './context/GlobalProvider';
import './App.css';
import './styles/Header.css';
import './styles/Main.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
// import DrinksRecipes from './pages/DrinksRecipes';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Footer from './components/Footer';

function App() {
  return (
    <Switch>
      <GlobalProvider>
        <Route exact path="/" component={ Login } />
        <Route
          exact
          path="/foods"
          render={ (props) => (
            <>
              <Foods { ...props } />
              <Footer { ...props } />
            </>) }
        />
        {/* Os detalhes de bebidas e comidas são renderizados no mesmo componente (req. 24) */}
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        <Route
          exact
          path="/foods/:id/in-progress"
          component={ RecipeInProgress }
        />

        <Route
          exact
          path="/profile"
          render={ (props) => (
            <>
              <Profile { ...props } />
              <Footer { ...props } />
            </>) }
        />

        <Route
          exact
          path="/drinks"
          render={ (props) => (
            <>
              <Drinks { ...props } />
              <Footer { ...props } />
            </>) }
        />
        {/* Os detalhes de bebidas e comidas são renderizados no mesmo componente (req. 24) */}
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />

        <Route exact path="/done-recipes" component={ DoneRecipes } />

        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />

      </GlobalProvider>
    </Switch>
  );
}

export default App;
