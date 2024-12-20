/** 
 *  Author: Willian Kenji Nishizawa 
 *  GitHub: github.com/KenjiNishi
 * 
 *  This file contains the Redux actions for Orders;
 *  Handles data fetching and dispatch to Reducers;
 */

import { FETCH_ORDERS,CREATE_ORDER, GET_ORDER, DELETE_ORDER, EDIT_ORDER, APPROVE_ORDER, CANCEL_ORDER} from './types';

export const fetchOrders = () => dispatch => {
  fetch('https://sances-test-backend.herokuapp.com/api/pedido' , {
    method: 'GET'})
    .then(res => res.json())
    .then(orders =>
      dispatch({
        type: FETCH_ORDERS,
        payload: orders.DATA
      })
    )
};

export const getItem = (numero) => dispatch => {
    fetch('https://sances-test-backend.herokuapp.com/api/pedido/'+numero , {
      method: 'GET'})
      .then(res => res.json())
      .then(order =>
        dispatch({
          type: GET_ORDER,
          payload: order.DATA
        })
      )
  };
  
export const createOrder = orderData => dispatch => {
  fetch('https://sances-test-backend.herokuapp.com/api/pedido', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
    .then(res => res.json())
    .then(order =>
      dispatch({
        type: CREATE_ORDER,
        payload: order.DATA
      })
    );
};

export const deleteOrder = numero => dispatch => {
  fetch('https://sances-test-backend.herokuapp.com/api/pedido/'+numero, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: DELETE_ORDER,
        payload: res
      })
    );
};

export const editOrder = (numero, changes) => dispatch => {
  fetch('https://sances-test-backend.herokuapp.com/api/pedido/'+numero, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body : JSON.stringify(changes)
  })
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: EDIT_ORDER,
        payload: res
      })
    );
};

export const approveOrder = numero => dispatch => {
    fetch('https://sances-test-backend.herokuapp.com/api/pedido/aprove/'+numero, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: APPROVE_ORDER,
          payload: res
        })
      );
  };

  export const cancelOrder = numero => dispatch => {
    fetch('https://sances-test-backend.herokuapp.com/api/pedido/cancel/'+numero, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: CANCEL_ORDER,
          payload: res
        })
      );
  };