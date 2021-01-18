import { combineReducers } from 'redux';

import itemReducer from './itemReducers';

export default combineReducers({
  items: itemReducer //state.items.VAR  eg VAR=itemList
});
