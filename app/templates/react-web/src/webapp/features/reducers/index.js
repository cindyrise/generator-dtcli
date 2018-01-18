import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { homeReducer } from './home';
import { globalReducer } from './global';

const appReducer = combineReducers({
  routing,
  home: homeReducer,
  global: globalReducer
});

export default appReducer;
