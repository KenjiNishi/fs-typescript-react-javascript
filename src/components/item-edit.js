import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editItem, fetchItems, getItem } from '../redux/actions/itemActions';

class ItemEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
          nome: '',
          valor: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeValor = this.onChangeValor.bind(this);

        
      }
    
    componentDidMount() {
      this.props.getItem(this.props.match.params.codigo)

      //this.setState({nome: this.props.item.name, valor: this.props.item.valorU})
    }

    onChangeNome(e) {
      this.setState({
        nome: e.target.value
      })
    }
    onChangeValor(e) {
      this.setState({
        valor: e.target.value
      })
    }

    onSubmit(e) {
        e.preventDefault();
    
        const changes = {
          name: this.state.nome,
          valorU: this.state.valor
        };
        if (changes.name !== '' || changes.valorU !== '') {
          this.props.editItem(this.props.item.codigo, changes);
          this.props.fetchItems();
        }
        this.props.history.push('/')
        
      }
  
    render() {
        return (
          <div className='container'>
            <div>
              <form onSubmit={this.onSubmit}>
                <h1>Editando informações:</h1>
                <h2>{this.props.item.codigo} - {this.props.item.name}</h2>
                <br />

                <div>
                    <label>Novo nome: </label><br/>
                    <input
                    type="text"
                    name="nome"
                    onChange={this.onChangeNome}
                    value={this.state.nome}
                    />
                </div> 
                <br />

                <div>
                    <label>Valor: </label><br/>
                    <input
                    type="number" step="0.01" min="0"
                    name="valor"
                    onChange={this.onChangeValor}
                    value={this.state.valor}
                    />
                </div>
                <br />
                <button type="submit">Atualizar</button> <button onClick={()=>{this.props.history.push('/')}}>Cancelar</button>
            </form>
            </div>
          </div>
        );
    }
}

ItemEdit.propTypes = {
  editItem: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  {
  item: state.items.selectedItem
});

export default connect(mapStateToProps, { editItem, fetchItems, getItem })(ItemEdit);