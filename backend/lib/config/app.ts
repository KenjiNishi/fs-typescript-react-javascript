import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';

const cors = require('cors');

import environment from "../environment";

import { CommonRoutes } from "../routes/common_routes"
import { ItemRoutes} from "../routes/itens_route"
import { PedidoRoutes } from "../routes/pedidos_routes"
class App {
   public app: express.Application;


   private common_routes: CommonRoutes = new CommonRoutes();
   private item_routes: ItemRoutes = new ItemRoutes();
   private pedido_routes: PedidoRoutes = new PedidoRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();

      this.item_routes.route(this.app);
      this.pedido_routes.route(this.app);
      this.common_routes.route(this.app);
   }

   private config(): void {
      this.app.use(cors());
      //application/json e application/x-www-form-urlencoded
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   private mongoSetup(): void {
      const URI = process.env.MONGODB_URI || environment.getDBUri();
      mongoose.connect(
         URI, 
         { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false 
         }
      );
      const connection = mongoose.connection;
      connection.once('open', () => {
         console.log('MongoDB conectado ao DB: ' + environment.getDBName())
      })
   }
}
export default new App().app;