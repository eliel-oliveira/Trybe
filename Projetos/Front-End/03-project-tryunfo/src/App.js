import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import Filter from './components/Filter';
import Deck from './components/Deck';
import stateData from './components/services/stateData';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = stateData;
  }

  inputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value },
    () => this.checkForm());
  }

  saveButton = (event) => {
    event.preventDefault();
    const { cardTrunfo, cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare } = this.state;
    let validadeTrunfo = false;
    if (cardTrunfo) { this.setState({ hasTrunfo: true }); validadeTrunfo = true; }
    const actualObj = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrufo: validadeTrunfo,
    };
    this.setState((prevState) => ({
      cardList: [...prevState.cardList, actualObj],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }));
  }

  calculatePoints = () => {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const maxPoints = 210;
    const maxValue = 90;
    if (cardAttr1 >= 0 && cardAttr1 <= maxValue
      && cardAttr2 >= 0 && cardAttr2 <= maxValue
      && cardAttr3 >= 0 && cardAttr3 <= maxValue) {
      const actualPoints = maxPoints - cardAttr1 - cardAttr2 - cardAttr3;
      return actualPoints >= 0;
    }
  }

  checkForm = () => {
    const { cardName, cardDescription, cardImage, cardRare } = this.state;
    if (cardName && cardDescription && cardImage && cardRare && this.calculatePoints()) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  removeButton = (index) => {
    const { cardList } = this.state;
    const checkTrunfo = cardList.some(({ hasTrunfo }) => hasTrunfo);
    if (!checkTrunfo) {
      this.setState({ hasTrunfo: false });
    }
    const newList = cardList;
    newList.splice(index, 1);
    this.setState({
      cardList: newList,
    });
    this.checkForm();
  }

  filterName = (event) => {
    this.setState({ filter: event.target.value });
  }

  rareFilter = (event) => {
    this.setState({
      rarityFilter: event.target.value === 'todas' ? 'todas' : event.target.value });
  }

  trFilter = (event) => {
    this.setState({
      filter: '',
      rarityFilter: 'todas',
      trunfoFilter: event.target.checked,
    });
  }

  render() {
    return (
      <main>
        <div className="cardOptions">
          <Form
            { ...this.state }
            onInputChange={ this.inputChange }
            onSaveButtonClick={ this.saveButton }
          />
          <Card { ...this.state } />
        </div>
        <Filter
          { ...this.state }
          filterName={ this.filterName }
          rareFilter={ this.rareFilter }
          trFilter={ this.trFilter }
        />
        <Deck { ...this.state } removeButton={ this.removeButton } />
      </main>
    );
  }
}

export default App;
