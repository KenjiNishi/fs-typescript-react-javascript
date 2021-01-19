import { combineReducers } from 'redux';

import itemReducer from './itemReducers';
import orderReducer from './orderReducers';

export default combineReducers({
  items: itemReducer, //state.items.VAR  eg VAR=itemList
  orders: orderReducer
});
