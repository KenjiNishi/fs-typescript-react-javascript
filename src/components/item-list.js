import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchItems } from '../redux/actions/itemActions';

const Item = props => (
  <tr>
    <td>{props.item.name}</td>
    <td>{props.item.codigo}</td>
    <td>{props.item.valorU}</td>
    <td>
      <p> Future buttons </p>
    </td>
  </tr>
)

class ItemsList extends Component {

  componentDidMount() {
    this.props.fetchItems();
  }


  itemList() {
    return this.props.items.map(currentitem => {
      return <Item item={currentitem} deleteItem={this.deleteItem} key={currentitem.codigo}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Items</h3>
        <table>
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
  items: PropTypes.array.isRequired
};

const mapStateToProps = state => (
  {
  items: state.items.itemList
});

export default connect(mapStateToProps, { fetchItems })(ItemsList);