"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class PedidoService {
    createPedido(pedido_params, callback) {
        const _session = new schema_1.default(pedido_params);
        _session.save(callback);
    }
    filterPedido(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    updatePedido(pedido_params, callback) {
        const query = { _id: pedido_params._id };
        schema_1.default.findOneAndUpdate(query, pedido_params, callback);
    }
    deletePedido(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = PedidoService;
