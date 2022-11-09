import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { headerTitle } = useContext(GlobalContext);
  const [searchMenu, setsearchMenu] = useState({ showMenu: false });

  const handleSearch = (event) => {
    event.preventDefault();
    const changeHide = searchMenu;
    changeHide.showMenu = !changeHide.showMenu;
    setsearchMenu({ ...changeHide });
  };

  return (
    <header className="header">
      <Link to="/profile">
        <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{ headerTitle.title }</h1>
      {headerTitle.search && (
        <button type="button" onClick={ handleSearch }>
          <img
            src={ searchIcon }
            alt="searchIcon"
            data-testid="search-top-btn"
          />
        </button>)}
      {searchMenu.showMenu
      && <SearchBar />}
    </header>
  );
}

export default Header;
