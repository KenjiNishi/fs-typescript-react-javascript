import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

import { fetchOrders } from '../redux/actions/orderActions';

const Order = props => {
    var cardBorder = (status) =>{switch(status){
        case 0:
            return "dark";
        case 1:
            return "success";
        case -1:
            return "danger";
        default:
            return "info";
    }};

    var cardStatus = (status) =>{switch(status)
        {
            case 0:
                return "Em Análise";
            case 1:
                return "Aprovado";
            case -1:
                return "Cancelado";
            default:
                return "no-status";
        }
    };

    return(
        <Card style={{ width: '40rem' }} border={cardBorder(props.order.situacao)}>
        <Card.Body>
            <Container>
                <Row>
                    <Col>
                        <p>Pedido {props.order.numero} ( {cardStatus(props.order.situacao)} )</p>
                    </Col>
                    <Col> 
                        <p>{props.order.data.substring(0,10)}</p>
                    </Col>
                </Row>

                <Row>
                    Descrição: {props.order.descricao}
                </Row>

                <Row>
                    <ListGroup>
                        {props.orderItemList(props.order.itens)}
                    </ListGroup>
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
}

const OrderItem = props => 
{
    return(
        <ListGroup.Item>
            <Container>
                <Row>
                    {props.item.codigo} 
                </Row>
                <Row>
                    <Col>
                        Quantidade: {props.item.quantidade}
                    </Col>
                    <Col>
                        Preço: {props.item.valorUnitario} Desconto: {props.item.desconto}%
                    </Col>
                    <Col>
                        Total: {props.item.valorTotal}
                    </Col>
                </Row>
            </Container>
        </ListGroup.Item>
    )
}

class OrdersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.fetchOrders();
    }

    orderList() {
        return this.props.orders.map(currentorder => {
            return <Order order={currentorder} fetchOrders={this.props.fetchOrders} orderItemList={this.orderItemList} key={currentorder.numero}/>;
        })
    }

    orderItemList(items) {
        return items.map(current => {
            return <OrderItem item={current} key={current.codigo}/>;
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <h1>Pedidos registrados:</h1>
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