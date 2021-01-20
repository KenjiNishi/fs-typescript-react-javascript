/** 
 *  Author: Willian Kenji Nishizawa 
 *  GitHub: github.com/KenjiNishi
 * 
 *  Handles the dispatch from ItemActions;
 *  Return a new Store State (with or without modifications).
 */

import { FETCH_ITEMS, CREATE_ITEM, DELETE_ITEM, EDIT_ITEM, GET_ITEM } from '../actions/types';

const initialState = {
  itemList: [],
  createdItem: {},
  selectedItem: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        itemList: action.payload
      };
    
    case CREATE_ITEM:
      return {
        ...state,
        createdItem: action.payload
      };
    
    case DELETE_ITEM:
      return state;

    case EDIT_ITEM:
      return state;

    case GET_ITEM:
      return {
        ...state,
        selectedItem: action.payload
      };

    default:
      return state;
  }
}