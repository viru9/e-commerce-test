import './../css/css/main.css';

import React, {Component} from 'react';
import MainNav from './Navbar';
import ProductList from './ProductList';
import ErrorBoundary from './../common/ErrorBoundary';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products_count:0
    }
  }

  render() {
    return (
      <div className="App">
      <ErrorBoundary>
      <MainNav products_count={this.state.products_count}/></ErrorBoundary>
      <ProductList on_product_add={(val)=>{this.setState({products_count:val})}}/>
      </div>
        );
  }
}

export default Home;
