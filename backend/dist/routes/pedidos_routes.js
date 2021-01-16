"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoRoutes = void 0;
const pedidoController_1 = require("../controllers/pedidoController");
class PedidoRoutes {
    constructor() {
        this.pedido_controller = new pedidoController_1.PedidoController();
    }
    route(app) {
        app.post('/api/pedido', (req, res) => {
            this.pedido_controller.create_pedido(req, res);
        });
        app.get('/api/pedido/:numero', (req, res) => {
            this.pedido_controller.get_pedido(req, res);
        });
        app.delete('/api/pedido/:numero', (req, res) => {
            this.pedido_controller.delete_pedido(req, res);
        });
    }
}
exports.PedidoRoutes = PedidoRoutes;
