/** 
 *  Author: Willian Kenji Nishizawa 
 *  GitHub: github.com/KenjiNishi
 * 
 *  This file links the values from the Reducers to the Store State;
 *  The states will be mapped to Props inside components.
 */

import { combineReducers } from 'redux';

import itemReducer from './itemReducers';
import orderReducer from './orderReducers';

export default combineReducers({
  items: itemReducer, //state.items.VAR  eg VAR=itemList
  orders: orderReducer
});
