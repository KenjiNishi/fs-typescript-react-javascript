import { Application, Request, Response } from 'express';
import { ItemController } from '../controllers/itemController';

export class ItemRoutes {

    private item_controller: ItemController = new ItemController();

    public route(app: Application) {
        
        app.post('/api/item', (req: Request, res: Response) => {
            this.item_controller.create_item(req, res);
        });

        app.get('/api/item/:id', (req: Request, res: Response) => {
            this.item_controller.get_item(req, res);
        });

        app.put('/api/item/:id', (req: Request, res: Response) => {
            this.item_controller.update_item(req, res);
        });

        app.delete('/api/item/:id', (req: Request, res: Response) => {
            this.item_controller.delete_item(req, res);
        });

    }
}