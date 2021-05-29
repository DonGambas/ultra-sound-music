import { combineReducers } from 'redux';

import entitiesReducer from './entities';
import modalReducer from './modal';
import userReducer from './user';

const rootReducer = combineReducers({
  modal: modalReducer,
  user: userReducer,
  entities: entitiesReducer,
});

export default rootReducer;
