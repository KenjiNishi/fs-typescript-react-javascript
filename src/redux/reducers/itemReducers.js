import { FETCH_ITEMS, CREATE_ITEM, DELETE_ITEM, EDIT_ITEM } from '../actions/types';

const initialState = {
  itemList: [],
  createdItem: {}
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

    default:
      return state;
  }
}