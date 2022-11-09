import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  render() {
    const { trunfoFilter, filterName, rareFilter, trFilter } = this.props;
    return (
      <div>
        <section className="formFilter">
          <label htmlFor="filter">
            <p>Filtro de Busca</p>
            <input
              name="filter"
              data-testid="name-filter"
              type="text"
              onChange={ filterName }
              disabled={ trunfoFilter }
            />
          </label>

          <label htmlFor="rarityFilter">
            <p>Raridade</p>
            <select
              data-testid="rare-filter"
              onChange={ rareFilter }
              disabled={ trunfoFilter }
              name="rarityFilter"
            >
              <option value="todas">todas</option>
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>

          <label data-testid="trunfo-filter" htmlFor="searchTrunfo">
            Super Trunfo
            <input
              type="checkbox"
              name="searchTrunfo"
              id="searchTrunfo"
              onChange={ trFilter }
            />
          </label>
        </section>

      </div>
    );
  }
}

Filter.propTypes = {
  filterName: PropTypes.func.isRequired,
  rareFilter: PropTypes.func.isRequired,
  trunfoFilter: PropTypes.bool.isRequired,
  trFilter: PropTypes.func.isRequired,
};

export default Filter;
