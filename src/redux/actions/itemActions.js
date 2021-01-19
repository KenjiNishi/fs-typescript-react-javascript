import { FETCH_ITEMS,CREATE_ITEM, DELETE_ITEM, EDIT_ITEM, GET_ITEM } from './types';

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

export const getItem = (codigo) => dispatch => {
  fetch('http://localhost:5000/api/item/'+codigo , {
    method: 'GET'})
    .then(res => res.json())
    .then(item =>
      dispatch({
        type: GET_ITEM,
        payload: item.DATA
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

export const deleteItem = codigo => dispatch => {
  fetch('http://localhost:5000/api/item/'+codigo, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: res
      })
    );
};

export const editItem = (codigo, changes) => dispatch => {
  fetch('http://localhost:5000/api/item/'+codigo, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body : JSON.stringify(changes)
  })
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: EDIT_ITEM,
        payload: res
      })
    );
};
