import { FETCH_ITEMS } from './types';

export const fetchItems = () => dispatch => {
  fetch('http://localhost:5000/api/item/' , {
    method: 'GET'})
    .then(res => res.json())
    .then(items =>
      dispatch({
        type: FETCH_ITEMS,
        payload: items.DATA
      })
    )
};