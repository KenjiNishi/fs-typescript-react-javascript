import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editItem } from '../redux/actions/itemActions';

class ItemEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
          codigo: '',
          nome: '',
          valor: ''
        };
      }

    handleClick = (x) => {
        this.props.toggle(x);
        };

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
    
        const changes = {
          name: this.state.nome,
          valorU: this.state.valor
        };
    
        this.props.editItem(this.state.codigo, changes);
        this.props.fetchItems();
        this.handleClick(this.props.item);
      }
  
    render() {
        return (
          <div className="modal">
            <div className="modal_content">
              <span className="close" onClick={this.handleClick}>&times;</span>
              <form onSubmit={this.onSubmit}>
                <p>Editando informações do produto {this.props.item.codigo}</p>
                <br />

                <div>
                    <label>Produto: </label><br/>
                    <input
                    type="text"
                    name="nome"
                    onChange={this.onChange}
                    value={this.props.item.nome}
                    />
                </div> 
                <br />

                <div>
                    <label>Valor: </label><br/>
                    <input
                    type="number" step="0.01" min="0"
                    name="valor"
                    onChange={this.onChange}
                    value={this.props.item.valor}
                    />
                </div>
                <br />
                <button type="submit">Atualizar</button>
            </form>
            </div>
          </div>
        );
    }
}

ItemEdit.propTypes = {
  editItem: PropTypes.func.isRequired
};
export default connect(null, { editItem })(ItemEdit);