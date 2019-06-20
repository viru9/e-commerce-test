import { combineReducers } from 'redux';
import HomeReducer from './home';

const rootReducer = combineReducers({
  home: HomeReducer
});

export default rootReducer;
