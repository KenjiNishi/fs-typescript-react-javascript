import { FETCH_ITEMS } from '../actions/types';

const initialState = {
  itemList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        itemList: action.payload
      };

    default:
      return state;
  }
}