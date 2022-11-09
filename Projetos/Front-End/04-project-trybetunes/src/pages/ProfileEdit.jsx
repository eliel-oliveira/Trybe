import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../contents/Header';
import Loading from '../contents/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
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
      // inputVerify: true,
      redirect: false,
    };
  }

  componentDidMount() {
    getUser().then((response) => this.setState({
      loading: false,
      user: response,
    }));
    // this.changeInput();
  }

  changeInput = ({ target }) => {
    const { user } = this.state;
    user[target.name] = target.value;
    if (user.name && user.description && user.email && user.image) {
      this.setState({
        user,
        inputVerify: false,
      });
    } else {
      this.setState({
        user,
        inputVerify: true,
      });
    }
  }

  updateInfo= () => {
    const { user } = this.state;
    this.setState({ loading: true });
    updateUser(user);
    this.setState({ redirect: true, loading: false });
  }

  redirectPage=() => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/profile" />;
    }
  }

  render() {
    const { loading, user, inputVerify } = this.state;
    return (
      <div>
        <Header />
        {this.redirectPage()}
        <div data-testid="page-profile-edit">
          <h2>Editar Perfil</h2>
          {loading ? <Loading />
            : (
              <form>
                <label htmlFor="name">
                  Nome:
                  <input
                    name="name"
                    type="text"
                    data-testid="edit-input-name"
                    value={ user.name }
                    onChange={ this.changeInput }
                  />
                </label>
                <label
                  htmlFor="email"
                >
                  email:
                  <input
                    name="email"
                    type="text"
                    data-testid="edit-input-email"
                    value={ user.email }
                    onChange={ this.changeInput }
                  />
                </label>
                <label htmlFor="description">
                  descrição:
                  <input
                    type="text"
                    name="description"
                    data-testid="edit-input-description"
                    value={ user.description }
                    onChange={ this.changeInput }
                  />
                </label>
                <label htmlFor="image">
                  foto de perfil
                  <input
                    data-testid="edit-input-image"
                    type="text"
                    name="image"
                    value={ user.image }
                    onChange={ this.changeInput }
                  />
                  {/* <img
                    name="image"
                    src={ user.image }
                    alt={ ` foto de perfil de ${user.image}` }
                  /> */}
                </label>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ inputVerify }
                  onClick={ this.updateInfo }
                >
                  Salvar alterações
                </button>
              </form>)}
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
