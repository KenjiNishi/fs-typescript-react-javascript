"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Interface e Schema da tabela
const mongoose = require("mongoose");
const model_1 = require("../common/model");
const schema = new mongoose.Schema({
    numero: { type: String, required: true, unique: true },
    data: { type: Date, required: true },
    descricao: { type: String, required: true },
    situacao: { type: String, required: true, default: "Em análise" },
    itens: [{
            codigo: { type: String, required: true },
            quantidade: { type: Number, required: true },
            valorUnitario: { type: Number, required: true },
            desconto: { type: Number, required: true },
            valorTotal: { type: Number, required: true }
        }],
    total: { type: Number },
    modification_notes: [model_1.ModificationNote]
});
exports.default = mongoose.model('itens', schema);
