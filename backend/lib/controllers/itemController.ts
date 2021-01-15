import { Request, Response } from 'express';
import e = require('express');

import { insufficientParameters, mongoError, successResponse, failureResponse } from '../models/common/service';

import { IItem } from '../models/itens/schema';
import ItemService from '../models/itens/service';

export class ItemController {
    private item_service: ItemService = new ItemService();

    public create_item(req: Request, res: Response) {
        if (req.body.name && req.body.valorU && req.body.codigo) {
            const item_params: IItem = {
                name: req.body.name,
                valorU: req.body.valorU,
                codigo: req.body.codigo,
                
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'Item criado'
                }]
            };
            this.item_service.createItem(item_params, (err: any, item_data: IItem) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Item criado com sucesso!', item_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_item(req: Request, res: Response) {
        if (req.params.codigo) {
            const item_filter = { codigo: req.params.codigo };
            this.item_service.filterItem(item_filter, (err: any, item_data: IItem) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get item realizado com sucesso', item_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_item(req: Request, res: Response) {
        if (req.params.codigo && req.body.name || req.body.valorU || req.body.codigo) {
            const item_filter = { codigo: req.params.codigo };
            this.item_service.filterItem(item_filter, (err: any, item_data: IItem) => {
                if (err) {
                    mongoError(err, res);

                } else if (item_data) {
                    item_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'Dados do item foram alterados'
                    });

                    const item_params: IItem = {
                        _id: item_data._id,
                        name: req.body.name ? req.body.name : item_data.name,
                        valorU: req.body.valorU ? req.body.valorU : item_data.valorU,
                        codigo: item_data.codigo,
                        modification_notes: item_data.modification_notes
                    };
                    
                    this.item_service.updateItem(item_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('Alteracao de item realizada com sucesso!', null, res);
                        }
                    });

                } else {
                    failureResponse('Item invalido', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_item(req: Request, res: Response) {
        if (req.params.codigo) {
            this.item_service.deleteItem(req.params.codigo, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('Item deletado com sucesso!', null, res);
                } else {
                    failureResponse('Item invalido', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}