import { Application, Request, Response } from 'express';
import { PedidoController } from '../controllers/pedidoController';

export class PedidoRoutes {

    private pedido_controller: PedidoController = new PedidoController();

    public route(app: Application) {
        
        app.post('/api/pedido', (req: Request, res: Response) => {
            this.pedido_controller.create_pedido(req, res);
        });

        app.get('/api/pedido', (req: Request, res: Response) => {
            this.pedido_controller.list_pedidos(req, res);
        });

        app.get('/api/pedido/:numero', (req: Request, res: Response) => {
            this.pedido_controller.get_pedido(req, res);
        });

        app.delete('/api/pedido/:numero', (req: Request, res: Response) => {
            this.pedido_controller.delete_pedido(req, res);
        });

        app.put('/api/pedido/aprove/:numero', (req: Request, res: Response) => {
            this.pedido_controller.aprove_pedido(req, res);
        });

        app.put('/api/pedido/cancel/:numero', (req: Request, res: Response) => {
            this.pedido_controller.cancel_pedido(req, res);
        });


    }
}