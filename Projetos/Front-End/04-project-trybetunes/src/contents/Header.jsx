import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logoHeader from '../services/images/logoHeader.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getUser().then((response) => {
      this.setState({
        name: response.name,
        loading: false,
      });
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div className="headerSection">
          <div className="logoHeader">
            <img src={ logoHeader } alt="logo" height="50px" />
            {/* src/contents/Header.jsx */}
          </div>
          {loading
            ? <Loading />
            : (
              <section data-testid="header-user-name" className="userInfo">
                {name}
              </section>)}
        </div>
        <nav className="navMenu">
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
