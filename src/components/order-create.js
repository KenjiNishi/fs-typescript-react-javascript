import React from "react";
import { useForm, useFieldArray} from 'react-hook-form';
import { Container, Row, Col} from 'react-bootstrap';

function OrderCreate() {
    const { register, control, handleSubmit } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "itens"
    });

    const onSubmit = (data) => {
        console.log(data);
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
                    <Col> <input type="text" name="data" placeholder="data" ref={register({required: true})}/> </Col>
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

                {fields.map(({ id, codigo, quantidade, valorUnitario, desconto}, index) => {
                    return (
                        <Row key={id}>
                            <Col md={2}>{index} <button type="button" onClick={() => remove(index)}>Remover</button></Col>
                            <Col md={3}>
                                <label>Codigo: </label>
                                <input
                                ref={register()}
                                name={`itens[${index}].codigo`}
                                defaultValue={codigo}
                                />
                            </Col>
                            
                            <Col md={3}>
                                <label>Quantidade: </label>
                                <input
                                    ref={register()}
                                    type="number"
                                    name={`itens[${index}].quantidade`}
                                    defaultValue={quantidade}
                                />
                            </Col>
                            
                            <Col md={3}>
                                <label>Preço unitário: </label>
                                <input
                                    ref={register()}
                                    type="number"
                                    name={`itens[${index}].valorUnitario`}
                                    defaultValue={valorUnitario}
                                />
                            </Col>

                            <Col md={1}>
                                <label>Desconto: </label>
                                <select
                                    ref={register()}
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
                        </Row>

                    );
                })}
                <Row>
                    <Col><input type="submit" /></Col>
                </Row> 
            </form>
        </Container>
    
  );
}
export default OrderCreate;