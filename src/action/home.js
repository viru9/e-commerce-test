import axios from 'axios';
import {ROOT_BASE_URL} from './../common/common';

export const FETCH_PRODUCT_LIST = 'fetch_product_list';
const FETCH_PRODUCTS = 'posts';

export function getProductList() {

  const request = axios.get(`${ROOT_BASE_URL}${FETCH_PRODUCTS}`);
  return (dispatch) => {
    request.then((data) => {
      if (data) {
        dispatch({type: FETCH_PRODUCT_LIST, payload: data});
      }
    }).catch(function(error) {
      // dispatch({type: SHOW_NOTIFICATION, payload: data});
    });
  };

}
