import { FETCH_ITEMS, CREATE_ITEM } from '../actions/types';

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

    default:
      return state;
  }
}