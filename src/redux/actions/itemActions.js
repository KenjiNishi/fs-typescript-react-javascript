import { FETCH_ITEMS, CREATE_ITEM } from './types';

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

export const createItem = itemData => dispatch => {
  fetch('http://localhost:5000/api/item/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(itemData)
  })
    .then(res => res.json())
    .then(item =>
      dispatch({
        type: CREATE_ITEM,
        payload: item.DATA
      })
    );
};