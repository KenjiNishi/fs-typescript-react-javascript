"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const environment_1 = require("../environment");
const common_routes_1 = require("../routes/common_routes");
const itens_route_1 = require("../routes/itens_route");
class App {
    constructor() {
        this.common_routes = new common_routes_1.CommonRoutes();
        this.item_routes = new itens_route_1.ItemRoutes();
        this.app = express();
        this.config();
        this.mongoSetup();
        this.item_routes.route(this.app);
        this.common_routes.route(this.app);
    }
    config() {
        //application/json e application/x-www-form-urlencoded
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.connect(environment_1.default.getDBUri(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log('MongoDB conectado ao DB: ' + environment_1.default.getDBName());
        });
    }
}
exports.default = new App().app;
