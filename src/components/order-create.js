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
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <Row>
                    <label>Numero: </label>
                    <input type="text" name="numero" placeholder="Numero do pedido" ref={register({required: true})} />
                </Row>
                <Row>
                    <label>Data: </label>
                    <input type="text" name="data" placeholder="data" ref={register({required: true})} />
                </Row>
                <Row>
                    <label>Descrição: </label>
                    <input type="textfield" name="descricao" placeholder="descricao" ref={register({required: true})} />
                </Row>
                <Row>
                    <button type="button" onClick={() => append({})}>
                        Novo Item
                    </button>
                </Row>

                {fields.map(({ id, codigo, quantidade, valorUnitario, desconto}, index) => {
                    return (
                        <Row key={id}>
                            <Col >{index}</Col>
                            <Col>
                                <label>Codigo: </label>
                                <input
                                ref={register()}
                                name={`itens[${index}].codigo`}
                                defaultValue={codigo}
                                />
                            </Col>
                            
                            <Col>
                                <label>Quantidade: </label>
                                <input
                                    ref={register()}
                                    type="number"
                                    name={`itens[${index}].quantidade`}
                                    defaultValue={quantidade}
                                />
                            </Col>
                            
                            <Col>
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
                            
                            <Col>
                                <label>Preço unitário: </label>
                                <input
                                    ref={register()}
                                    type="number"
                                    name={`itens[${index}].valorUnitario`}
                                    defaultValue={valorUnitario}
                                />
                            </Col>

                            <Col><button type="button" onClick={() => remove(index)}>Remover</button></Col>
                        </Row>

                    );
                })}
                    <input type="submit" />
                    
                </form>
        </Container>
    
  );
}
export default OrderCreate;