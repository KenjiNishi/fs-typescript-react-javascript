"use strict";
// Interface e Schema da tabela
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const model_1 = require("../common/model");
const schema = new mongoose.Schema({
    name: { type: String },
    codigo: { type: String, required: true, unique: true },
    valorU: { type: Number, required: true },
    modification_notes: [model_1.ModificationNote]
});
exports.default = mongoose.model('itens', schema);
