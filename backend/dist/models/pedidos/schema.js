"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.situacaoPedido = void 0;
// Interface e Schema da tabela
const mongoose = require("mongoose");
const model_1 = require("../common/model");
var situacaoPedido;
(function (situacaoPedido) {
    situacaoPedido[situacaoPedido["analise"] = 0] = "analise";
    situacaoPedido[situacaoPedido["aprovado"] = 1] = "aprovado";
    situacaoPedido[situacaoPedido["cancelado"] = -1] = "cancelado";
})(situacaoPedido = exports.situacaoPedido || (exports.situacaoPedido = {}));
const schema = new mongoose.Schema({
    numero: { type: String, required: true, unique: true },
    data: { type: Date, required: true },
    descricao: { type: String, required: true },
    situacao: { type: Number, required: true, default: situacaoPedido.analise },
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
exports.default = mongoose.model('pedidos', schema);
