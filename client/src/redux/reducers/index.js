import { combineReducers } from 'redux';

import entitiesReducer from './entities';
import modalReducer from './modal';
import userReducer from './user';
import web3Reducer from './web3';

const rootReducer = combineReducers({
  modal: modalReducer,
  user: userReducer,
  entities: entitiesReducer,
  web3: web3Reducer,
});

export default rootReducer;
