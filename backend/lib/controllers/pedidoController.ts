import { Request, Response } from 'express';
import e = require('express');

import { insufficientParameters, mongoError, successResponse, failureResponse } from '../models/common/service';

import { IPedido, situacaoPedido } from '../models/pedidos/schema';
import PedidoService from '../models/pedidos/service';

export class PedidoController {
    private pedido_service: PedidoService = new PedidoService();

    public create_pedido(req: Request, res: Response) {
        if (req.body.numero && req.body.data && req.body.descricao) {
            const pedido_params: IPedido = {
                numero: req.body.numero,
                data: req.body.data,
                descricao: req.body.descricao,
                situacao: situacaoPedido.analise,

                itens: [req.body.itens],
                
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'Pedido criado'
                }]
            };
            this.pedido_service.createPedido(pedido_params, (err: any, pedido_data: IPedido) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Pedido criado com sucesso!', pedido_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_pedido(req: Request, res: Response) {
        if (req.params.numero) {
            const pedido_filter = { numero: req.params.numero };
            this.pedido_service.filterPedido(pedido_filter, (err: any, pedido_data: IPedido) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get pedido realizado com sucesso', pedido_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_pedido(req: Request, res: Response) {
        if (req.params.numero) {
            this.pedido_service.deletePedido(req.params.numero, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('Pedido deletado com sucesso!', null, res);
                } else {
                    failureResponse('Pedido invalido', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}