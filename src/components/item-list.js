import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchItems, deleteItem } from '../redux/actions/itemActions';

const Item = props => (
  <tr>
    <td>{props.item.name}</td>
    <td>{props.item.codigo}</td>
    <td>{props.item.valorU}</td>
    <td>
      <p> <button onClick={() => { 
            props.deleteItem(props.item.codigo); props.fetchItems()
          }}>Deletar</button> 
          
          <Link to={"/editItem/"+props.item.codigo} onClick={() => {console.log('editing')}}> <button>Editar</button></Link> 
      </p>
    </td>
  </tr>
)

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      selectedItem : {codigo:'', nome:'', valor:'' }
    }
  }

  togglePopup = (item) => {
    console.log(item)
    this.setState({
      popup: !this.state.popup,
      selectedItem: {codigo: item.codigo, nome: item.name, valor: item.valorU}
    },
      () => {console.log(this.state)}
    );
  };

  componentDidMount() {
    this.props.fetchItems();
  }


  itemList() {
    return this.props.items.map(currentitem => {
      return <Item item={currentitem} deleteItem={this.props.deleteItem} fetchItems={this.props.fetchItems} key={currentitem.codigo}/>;
    })
  }


  render() {
    return (
      <div>
        <h3>Logged Items</h3>
        <table className="tabela1">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Código</th>
              <th>Valor atual</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            { this.itemList() }
          </tbody>
        </table>
      </div>
    )
  }
}

ItemsList.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

const mapStateToProps = state => (
  {
  items: state.items.itemList
});

export default connect(mapStateToProps, { fetchItems, deleteItem})(ItemsList);