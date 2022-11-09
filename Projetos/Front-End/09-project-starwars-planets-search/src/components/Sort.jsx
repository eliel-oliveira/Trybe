import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Sort() {
  const [sortColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  const { starwarsList, setstarwarsList } = useContext(PlanetsContext);
  // const [selectOrder, setHandleOrder] = useState({ select: 'population', order: false });
  const [order, setOrder] = useState({ select: 'population', order: false });

  const sortPlanets = (event) => {
    event.preventDefault();
    const arrayList = [...starwarsList];
    const thisOrder = order;
    if (!thisOrder.order) {
      arrayList.sort((a, b) => a[order.select] - b[order.select]); // filtra na ordem descendente para nao bugar o array
      return setstarwarsList(arrayList.sort((a, b) => b[order.select] - a[order.select]));
    }
    arrayList.sort((a, b) => b[order.select] - a[order.select]);
    return setstarwarsList(arrayList.sort((a, b) => a[order.select] - b[order.select]));
  };

  const handleOrder = ({ target }) => {
    const prevOrder = { ...order };
    if (target.value === 'ASC') {
      const newOrder = { ...prevOrder, order: true };
      setOrder(newOrder);
    } else {
      const newOrder = { ...prevOrder, order: false };
      setOrder(newOrder);
    }
  };
  const handleSelect = ({ target }) => {
    const prevOrder = { ...order };
    const newOrder = { ...prevOrder, select: target.value };
    setOrder(newOrder);
  };

  return (
    <form>
      <label htmlFor="column-sort">
        Ordernar
        <select
          name="column-sort"
          id="column-sort"
          data-testid="column-sort"
          onChange={ handleSelect }
        >
          {sortColumn.map((item) => (
            <option key={ item }>{item}</option>
          ))}
        </select>
      </label>
      <label htmlFor="radioASC">
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="radioASC"
          name="order"
          onChange={ handleOrder }
          // checked
        />
        Ascendente
      </label>
      <label htmlFor="radioDESC">
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          id="radioDESC"
          name="order"
          onChange={ handleOrder }
        />
        Descedente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ sortPlanets }
      >
        Ordenar
      </button>
    </form>
  );
}

export default Sort;
