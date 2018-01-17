import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { homeReducer } from './home';
import { globalReducer } from './global';
import {testReducer } from './test';
import {personCenterReducer } from './personCenter';
import {persosReducer } from './persos';
import {testPersonReducer } from './testPerson';
import {ttlReducer } from './ttl';
import {helloReducer } from './hello';


const appReducer = combineReducers({
  routing,
  home: homeReducer,
  global:globalReducer
 ,test:testReducer
 ,personCenter:personCenterReducer
 ,persos:persosReducer
 ,testPerson:testPersonReducer
 ,ttl:ttlReducer
 ,hello:helloReducer
});

export default appReducer;
