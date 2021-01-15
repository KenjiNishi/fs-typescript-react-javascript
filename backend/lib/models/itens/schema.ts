// Interface e Schema da tabela
// Codigo de um item nao pode ser modificado, pois o mesmo é usado como chave unica.*

import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const schema = new mongoose.Schema({
    name: {type: String},
    codigo: {type: String, required: true, unique: true},
    valorU: {type: Number, required: true},
    
    modification_notes: [ModificationNote]
});
export default mongoose.model('itens', schema);


export interface IItem {
    _id?: String;
    name: String,
    codigo: String;
    valorU: Number;
   
    modification_notes: ModificationNote[]
}

