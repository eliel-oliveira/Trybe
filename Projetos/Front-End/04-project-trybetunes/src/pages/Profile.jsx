import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../contents/Header';
import Loading from '../contents/Loading';
import { getUser } from '../services/userAPI';

class Profiles extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {
        name: '',
        email: '',
        image: '',
        description: '',
      },
    };
  }

  componentDidMount() {
    getUser().then((response) => this.setState({
      user: response,
      loading: false,
    }));
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div>
        <Header />
        {loading ? <Loading />
          : (
            <div data-testid="page-profile">
              <h1>Perfil</h1>
              <ul>
                <img
                  data-testid="profile-image"
                  src={ user.image }
                  alt={ `imagem ${user.name}` }
                />
                <Link to="/profile/edit"><h5>Editar perfil</h5></Link>
                <li>{user.name}</li>
                <li>{user.email}</li>
                <li>{user.description}</li>
              </ul>
            </div>)}
      </div>
    );
  }
}

export default Profiles;
