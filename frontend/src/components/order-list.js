/** 
 *  Author: Willian Kenji Nishizawa 
 *  GitHub: github.com/KenjiNishi
 * 
 *  This file contains the the component that lists all the registered Orders;
 *  React-bootstrap components are used to make the layout more readable;
 *  I opted to use Cards and ListGroup for ease of use and customization;
 *  
 *  Will only create a new Order if the fields are set correctly;
 *  If the Order is "in analysis" the user can approve or cancel the order. 
 *  Otherwise, the user can delete the entry;
 *  
 *  This page is connected to the Redux Store in order to get access to orderActions.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container, Row, Col, Card, ListGroup} from 'react-bootstrap';

import { fetchOrders, cancelOrder, approveOrder, deleteOrder} from '../redux/actions/orderActions';

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

    var showButtons = (status, props) => {
        if (status===0){
            return(
                <div>
                <button onClick={() => { 
                    props.approveAction(props.order.numero)
                    props.fetchOrders();
                }}>Aprovar</button> 
                <button onClick={() => { 
                    props.cancelAction(props.order.numero)
                    props.fetchOrders();
                }}>Cancelar</button>
                </div>
            )
        }
        else {
            return(
                <div><button onClick={() => { 
                    props.deleteAction(props.order.numero)
                    props.fetchOrders();
                }}>Deletar</button></div>
            )
        }
    }

    return(
        <Card style={{ width: '40rem', margin: '1rem'}} border={cardBorder(props.order.situacao)}>
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
                    {showButtons(props.order.situacao, props)}
                </Row>
            </Container> 
        </Card.Body>
    </Card>
    )
}

const OrderItem = props => 
{
    return(
        <ListGroup.Item style={{ margin: '1rem'}}>
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
        return this.props.orders.sort().map(currentorder => {
            return <Order 
                        order={currentorder} 
                        fetchOrders={this.props.fetchOrders} 
                        orderItemList={this.orderItemList} 
                        approveAction={this.props.approveOrder} 
                        cancelAction={this.props.cancelOrder} 
                        deleteAction={this.props.deleteOrder}
                        key={currentorder.numero}
                    />;
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
    approveOrder: PropTypes.func.isRequired,
    cancelOrder: PropTypes.func.isRequired,
    deleteOrder: PropTypes.func.isRequired,
    orders: PropTypes.array.isRequired
};

const mapStateToProps = state => (
    {
        orders: state.orders.orderList
    }
);
export default connect(mapStateToProps, { fetchOrders, cancelOrder, approveOrder, deleteOrder })(OrdersList);