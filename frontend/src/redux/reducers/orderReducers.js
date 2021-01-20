/** 
 *  Author: Willian Kenji Nishizawa 
 *  GitHub: github.com/KenjiNishi
 * 
 *  Handles the dispatch from OrderActions;
 *  Return a new Store State (with or without modifications).
 */

import { FETCH_ORDERS, GET_ORDER, CREATE_ORDER, DELETE_ORDER, EDIT_ORDER, APPROVE_ORDER, CANCEL_ORDER} from '../actions/types';

const initialState = {
    orderList: [],
    createdOrder: {},
    selectedOrder: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS:
        return {
            ...state,
            orderList: action.payload
        };
    
    case GET_ORDER:
        return {
            ...state,
            selectedOrder: action.payload
        }
    
    case CREATE_ORDER:
        return {
            ...state,
            createdOrder: action.payload
        };
    
    case DELETE_ORDER:
        return state;

    case EDIT_ORDER:
        return state;

    case APPROVE_ORDER:
        return state;
    
    case CANCEL_ORDER:
        return state;

    default:
      return state;
  }
}