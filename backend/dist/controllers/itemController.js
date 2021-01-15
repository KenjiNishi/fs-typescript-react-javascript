"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const service_1 = require("../models/common/service");
const service_2 = require("../models/itens/service");
class ItemController {
    constructor() {
        this.item_service = new service_2.default();
    }
    create_item(req, res) {
        if (req.body.name && req.body.valorU && req.body.codigo) {
            const item_params = {
                name: req.body.name,
                valorU: req.body.valorU,
                codigo: req.body.codigo,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'Item criado'
                    }]
            };
            this.item_service.createItem(item_params, (err, item_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Item criado com sucesso!', item_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_item(req, res) {
        if (req.params.id) {
            const item_filter = { _id: req.params.id };
            this.item_service.filterItem(item_filter, (err, item_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('get item realizado com sucesso', item_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    update_item(req, res) {
        if (req.params.id && req.body.name || req.body.valorU || req.body.codigo) {
            const item_filter = { _id: req.params.id };
            this.item_service.filterItem(item_filter, (err, item_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (item_data) {
                    item_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'Dados do item foram alterados'
                    });
                    const item_params = {
                        _id: req.params.id,
                        name: req.body.name ? req.body.name : item_data.name,
                        valorU: req.body.valorU ? req.body.valorU : item_data.valorU,
                        codigo: req.body.codigo ? req.body.codigo : item_data.codigo,
                        modification_notes: item_data.modification_notes
                    };
                    this.item_service.updateItem(item_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('Alteracao de item realizada com sucesso!', null, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse('Item invalido', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_item(req, res) {
        if (req.params.id) {
            this.item_service.deleteItem(req.params.id, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('Item deletado com sucesso!', null, res);
                }
                else {
                    service_1.failureResponse('Item invalido', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.ItemController = ItemController;
