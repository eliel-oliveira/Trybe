import React from 'react';
import './App.css';
import Menu from './components/Menu';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Menu />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
