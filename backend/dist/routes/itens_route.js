"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRoutes = void 0;
const itemController_1 = require("../controllers/itemController");
class ItemRoutes {
    constructor() {
        this.item_controller = new itemController_1.ItemController();
    }
    route(app) {
        app.post('/api/item', (req, res) => {
            this.item_controller.create_item(req, res);
        });
        app.get('/api/item/:id', (req, res) => {
            this.item_controller.get_item(req, res);
        });
        app.put('/api/item/:id', (req, res) => {
            this.item_controller.update_item(req, res);
        });
        app.delete('/api/item/:id', (req, res) => {
            this.item_controller.delete_item(req, res);
        });
    }
}
exports.ItemRoutes = ItemRoutes;
