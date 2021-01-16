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
    aprovePedido(_id, callback) {
        // TODO
    }
    cancelPedido(_id, callback) {
        // TODO
    }
    deletePedido(_id, callback) {
        const query = { numero: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = PedidoService;
