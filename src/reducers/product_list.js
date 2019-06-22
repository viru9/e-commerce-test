import {FETCH_PRODUCT_LIST} from './../action/home';
import {USE_DUMMY_DATA, PRODUCTS_DATA} from './dummy_data/products'; //import dummy data...

export default function(state = {}, action) {

  switch (action.type) {

    case FETCH_PRODUCT_LIST:
    if(USE_DUMMY_DATA){
      return PRODUCTS_DATA;
    }
    else{
      return action.payload.data;
    }

    default:
      return state;
  }

}
