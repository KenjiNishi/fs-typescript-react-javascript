// Interface e Schema da tabela
import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

export enum situacaoPedido {
    analise = 0,
    aprovado = 1,
    cancelado = -1
}

const schema = new mongoose.Schema({
    numero: {type: String, required: true, unique: true},
    data: {type: Date, required: true},
    descricao: {type: String, required: true},
    situacao: {type: Number, required: true, default: situacaoPedido.analise},
    
    itens :[{
        codigo: {type: String, required: true},
        quantidade: {type: Number, required: true},
        valorUnitario: {type: Number, required: true},
        desconto: {type:Number, required: true},
        valorTotal: {type: Number, required: true}
    }],

    total: {type: Number},

    modification_notes: [ModificationNote]
});
export default mongoose.model('itens', schema);


export interface IItensPedido{
    codigo: String;
    quantidade: Number;
    valorUnitario: Number;
    desconto: Number;
    valorTotal: Number;
}

export interface IPedido {
    _id?: String;
    numero: Number;
    data: Date;
    descricao: String;
    situacao: Number;

    itens: Array<IItensPedido>;
   
    modification_notes: ModificationNote[]
}

