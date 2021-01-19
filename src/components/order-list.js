import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container, Row, Col, Card } from 'react-bootstrap';

import { fetchOrders } from '../redux/actions/orderActions';

const Order = props => (
    <Card style={{ width: '20rem' }} border={props.setBorder(props.order.situacao)}>
      <Card.Body>
          <Container>
              <Row>
                  <Col>
                    <p>Pedido {props.order.numero} ({props.setSituacao(props.order.situacao)})</p>
                  </Col>
                  <Col> 
                    <p>{props.order.data.substring(0,10)}</p>
                  </Col>
                </Row>

                <Row>
                    Descrição: {props.order.descricao}
                </Row>

                <Row>
                    ITENS 
                </Row>

                <Row>
                    <button onClick={() => { 
                        props.fetchOrders()
                    }}>Aprovar</button> 

                    <button onClick={() => { 
                        props.fetchOrders()
                    }}>Cancelar</button>
                </Row>
          </Container> 
      </Card.Body>
      
  </Card>
)

class OrdersList extends Component {
    constructor(props) {
        super(props);

        this.setCardBorder = this.setCardBorder.bind(this);

        this.state = {

        }
    }

    componentDidMount() {
        this.props.fetchOrders();
    }

    setCardBorder(status){
        switch(status){
            case 0:
                return "dark";
            case 1:
                return "success";
            case -1:
                return "danger";
            default:
                return "info";
        }
    }

    setSituacao(status){
        switch(status){
            case 0:
                return "Em Análise";
            case 1:
                return "Aprovado";
            case -1:
                return "Cancelado";
            default:
                return "no-status";
        }
    }

    orderList() {
        return this.props.orders.map(currentorder => {
        return <Order order={currentorder} fetchOrders={this.props.fetchOrders} setSituacao={this.setSituacao} setBorder={this.setCardBorder} key={currentorder.numero}/>;
        })
    }


    render() {
        return (
            <Container>
                <Row>
                    <h3>Pedidos registrados:</h3>
                </Row>
                <Row>
                    { this.orderList() }
                </Row>
            </Container>
        )
    }
}

OrdersList.propTypes = {
    fetchOrders: PropTypes.func.isRequired,
    orders: PropTypes.array.isRequired
};

const mapStateToProps = state => (
    {
        orders: state.orders.orderList
    }
);
export default connect(mapStateToProps, { fetchOrders})(OrdersList);