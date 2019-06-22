import 'bootstrap/dist/css/bootstrap.min.css';
import './css/css/main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Home from './component/Home';
import ShopingCart from './component/ShopingCart';
import ItemPage from './component/ItemPage';

import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
   applyMiddleware(promise,thunk)
));

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <Switch>
      <Route exact path="/item-page/:id" component={ItemPage}/>
      <Route exact path="/shoping-cart" component={ShopingCart}/>
      <Route exact path="/" component={Home}/>
    </Switch>
  </BrowserRouter>
</Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
