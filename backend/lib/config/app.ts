import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';

import environment from "../environment";

import { TestRoutes } from "../routes/test_routes";
import { CommonRoutes } from "../routes/common_routes"
import { ItemRoutes} from "../routes/itens_route"

class App {
   public app: express.Application;

   
   private test_routes: TestRoutes = new TestRoutes();
   private common_routes: CommonRoutes = new CommonRoutes();
   private item_routes: ItemRoutes = new ItemRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();

      this.test_routes.route(this.app);
      this.item_routes.route(this.app);
      
      this.common_routes.route(this.app);
   }

   private config(): void {
      //application/json e application/x-www-form-urlencoded
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   private mongoSetup(): void {
      mongoose.connect(
         environment.getDBUri(), 
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