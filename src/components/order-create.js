/** 
 *  Author: Willian Kenji Nishizawa 
 *  GitHub: github.com/KenjiNishi
 * 
 *  This file contains the form that creates new Orders;
 *  React-hook-form allows for an easier way to implement dynamic forms compared to React's useState();
 *  React-bootstrap components are used to make the layout more readable;
 *  Will only create a new Order if the fields are set correctly;
 *  
 *  This page is connected to the Redux Store in order to get access to orderActions.
 */

import React from "react";
import { useHistory } from "react-router-dom";
import { useForm, useFieldArray, useWatch, Controller} from 'react-hook-form';
import { Container, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { createOrder} from '../redux/actions/orderActions';

const PrecoDescontado = ({ control, index }) => {
    const value = useWatch({
      control,
      name: `itens[${index}]`,
      defaultValue: {}
    });
    return <span>{(value.valorUnitario || 0) * (value.quantidade || 0) * (1-(value.desconto/100) || 0)}</span>;
  };

function OrderCreate({createOrder}) {

    const history = useHistory();
    const { register, control, handleSubmit } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "itens"
    });

    const onSubmit = (data) => {
        var total = 0;
        var duplicate = true;

        if (data.itens){
            data.itens.forEach(item => {
                item.valorTotal = item.valorUnitario * item.quantidade * (1-(item.desconto/100))
                total += item.valorTotal
            })
            
            duplicate = false;
            data.itens.map(item => item.codigo).sort().sort((codigo1, codigo2) => {
                if (codigo1 === codigo2) duplicate = true
            })
        }

        data.total = total;
        if (!duplicate){
            createOrder(data);
            history.push("/");
        }
        else{
            console.log('Sem Itens ou Itens duplicados no pedido!')
            history.push("/");
        }
    } 

    return (
        <Container>
            <h1>Registrando novo pedido: </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <br/>
                <Row>
                    <Col md={1}><label>Numero: </label></Col>
                    <Col><input type="text" name="numero" placeholder="Numero do pedido" ref={register({required: true})}/> </Col>
                </Row>
                <Row>
                    <Col md={1}><label>Data: </label></Col>
                    <Col> 
                        <Controller
                            name={'data'}
                            control={control}
                            render={({ onChange, value }) => (
                                <DatePicker
                                    selected={value}
                                    onChange={onChange}
                                    dateFormat="dd/MM/yyyy"
                                />
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={1}><label>Descrição: </label></Col>
                    <Col> <input type="textfield" name="descricao" placeholder="descricao" ref={register({required: true})}/> </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <button type="button" onClick={() => append({})}>
                            Novo Item 
                        </button>
                    </Col>
                    
                </Row>
                <br/>

                {fields.map(({ id, codigo, quantidade, valorUnitario, desconto, valorTotal}, index) => {
                    return (
                        <Container key={id}>
                         <Row>
                            <Col md={2}>{index} <button type="button" onClick={() => remove(index)}>Remover</button></Col> 
                        </Row>

                        <Row>
                            <Col md={3}>
                                <label>Codigo: </label>
                                <input
                                ref={register({required: true})}
                                name={`itens[${index}].codigo`}
                                defaultValue={codigo}
                                />
                            </Col>
                            
                            <Col md={3}>
                                <label>Quantidade: </label>
                                <input
                                    ref={register({required: true})}
                                    type="number" min="0"
                                    name={`itens[${index}].quantidade`}
                                    defaultValue={quantidade}
                                />
                            </Col>
                            
                            <Col md={3}>
                                <label>Preço unitário: </label>
                                <input
                                    ref={register({required: true})}
                                    type="number" step="0.01" min="0"
                                    name={`itens[${index}].valorUnitario`}
                                    defaultValue={valorUnitario}
                                />
                            </Col>

                            <Col md={2}>
                                <label>Desconto: </label>
                                <select
                                    ref={register({required: true})}
                                    name={`itens[${index}].desconto`}
                                    defaultValue={desconto}
                                >
                                    <option value="0">0%</option>
                                    <option value="10">10%</option>
                                    <option value="25">25%</option>
                                    <option value="50">50%</option>
                                    <option value="75">75%</option>
                                </select>
                            </Col>

                            <Col md={1}>
                                <Row>Valor final:</Row>
                                <Row><PrecoDescontado control={control} index={index} /></Row>
                            </Col>
                        </Row>
                        <br/>
                        </Container>
                    );
                })}
                <Row>
                    <Col><input type="submit" /></Col>
                </Row> 
            </form>
        </Container>
    
  );
}
export default connect(null, { createOrder }) (OrderCreate);