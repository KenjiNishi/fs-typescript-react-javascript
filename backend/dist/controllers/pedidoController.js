"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoController = void 0;
const service_1 = require("../models/common/service");
const schema_1 = require("../models/pedidos/schema");
const service_2 = require("../models/pedidos/service");
class PedidoController {
    constructor() {
        this.pedido_service = new service_2.default();
    }
    create_pedido(req, res) {
        if (req.body.numero && req.body.data && req.body.descricao) {
            const pedido_params = {
                numero: req.body.numero,
                data: req.body.data,
                descricao: req.body.descricao,
                situacao: schema_1.situacaoPedido.analise,
                itens: [req.body.itens],
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'Pedido criado'
                    }]
            };
            this.pedido_service.createPedido(pedido_params, (err, pedido_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Pedido criado com sucesso!', pedido_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_pedido(req, res) {
        if (req.params.numero) {
            const pedido_filter = { numero: req.params.numero };
            this.pedido_service.filterPedido(pedido_filter, (err, pedido_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('get pedido realizado com sucesso', pedido_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_pedido(req, res) {
        if (req.params.numero) {
            this.pedido_service.deletePedido(req.params.numero, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('Pedido deletado com sucesso!', null, res);
                }
                else {
                    service_1.failureResponse('Pedido invalido', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.PedidoController = PedidoController;