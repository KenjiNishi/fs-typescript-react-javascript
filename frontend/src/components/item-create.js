/** 
 *  Author: Willian Kenji Nishizawa 
 *  GitHub: github.com/KenjiNishi
 * 
 *  This file contains the form that creates new Items;
 *  Simple HTML elements inside a React component;
 *  
 *  This page is connected to the Redux Store in order to get access to itemActions.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchItems, createItem } from '../redux/actions/itemActions';

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      nome: '',
      valor: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const item = {
      codigo: this.state.codigo,
      name: this.state.nome,
      valorU: this.state.valor
    };

    this.props.createItem(item);
    this.props.fetchItems();
    this.setState({codigo: '',nome: '', valor: ''})
  }

  render() {
    return (
      <div className='container'>
        <h3>Registrar novo produto</h3>
        <form action='' onSubmit={this.onSubmit} id="itemForm">
          <div className='row'>
            <div className='col'>
                <label>Codigo: </label><br/>
                <input
                type="text"
                name="codigo"
                onChange={this.onChange}
                value={this.state.codigo}
                />
            </div>

            <div className='col'>
              <label>Produto: </label><br/>
              <input
              type="text"
              name="nome"
              onChange={this.onChange}
              value={this.state.nome}
              />
            </div> 

            <div className='col'>
                <label>Valor: </label><br/>
                <input
                type="number" step="0.01" min="0"
                name="valor"
                onChange={this.onChange}
                value={this.state.valor}
                />
            </div>
          </div>
          <br/>
          <button type="submit">Registrar</button>
        </form>
      </div>
    );
  }
}

ItemForm.propTypes = {
  createItem: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired
};

export default connect(null, { createItem, fetchItems })(ItemForm);