"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./config/app");
const environment_1 = require("./environment");
app_1.default.listen(environment_1.default.getPort(), () => {
    console.log('Servidor Express ouvindo a porta: ' + environment_1.default.getPort());
});
