import { combineReducers } from 'redux';
import ProductListReducer from './product_list';

const rootReducer = combineReducers({
  products: ProductListReducer
});

export default rootReducer;
