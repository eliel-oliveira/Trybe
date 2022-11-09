import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class Deck extends React.Component {
  removeButton = (card) => {
    const { removeButton } = this.props;
    removeButton(card);
  }

  render() {
    const { cardList, filter, rarityFilter, trunfoFilter } = this.props;
    return (
      <div className="deck">
        <div className="containerCardsList">
          {trunfoFilter
            ? cardList.filter((card) => card.cardTrufo).map((card, index) => (
              <div key={ index } className="cardSaved">
                <Card { ... card } removeButton={ () => this.removeButton(index) } />
              </div>
            ))
            : cardList.filter((cardSearch) => cardSearch.cardName.includes(filter)
          && (cardSearch.cardRare === rarityFilter || rarityFilter === 'todas'))
              .map((card, index) => (
                <div key={ index } className="cardSaved">
                  <Card
                    { ... card }
                    key={ index }
                    removeButton={ () => this.removeButton(index) }
                  />
                </div>))}
        </div>
      </div>
    );
  }
}

Deck.propTypes = {
  cardName: PropTypes.string,
  filter: PropTypes.string,
  rarityFilter: PropTypes.string,
  removeButton: PropTypes.boolean,
  cardList: PropTypes.arrayOf(PropTypes.shape),
  trunfoFilter: PropTypes.bool,
}.isRequired;

export default Deck;
