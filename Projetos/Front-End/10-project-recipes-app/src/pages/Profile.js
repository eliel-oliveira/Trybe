import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import GlobalContext from '../context/GlobalContext';

function Profile() {
  const { setheaderTitle } = useContext(GlobalContext);
  useEffect(() => {
    setheaderTitle({ title: 'Profile', search: false });
  }, [setheaderTitle]);

  const getEmail = () => {
    if (!localStorage.getItem('user')) return null;
    const email = JSON.parse(localStorage.getItem('user'));
    return email.email;
  };
  const logout = () => {
    localStorage.clear();
  };

  return (
    <>
      <Header />
      <main>
        <p data-testid="profile-email">{ getEmail() }</p>
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logout }
          >
            Logout
          </button>
        </Link>
      </main>
    </>
  );
}

export default Profile;
