import './../css/css/main.css';

import React from 'react';
import MainNav from './Navbar';
import ProductList from './ProductList';

function App() {
  return (
    <div className="App">
    <MainNav/>
    <ProductList/>
    </div>
  );
}

export default App;
