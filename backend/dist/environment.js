"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var Environments;
(function (Environments) {
    Environments["local_environment"] = "local";
    Environments["dev_environment"] = "dev";
    Environments["prod_environment"] = "prod";
})(Environments || (Environments = {}));
class Environment {
    constructor(environment) {
        this.environment = environment;
    }
    getDBUri() {
        return (process.env.MDB_URI + this.getDBName() + "?retryWrites=true&w=majority");
    }
    getPort() {
        if (this.environment === Environments.prod_environment) {
            return 8081;
        }
        else if (this.environment === Environments.dev_environment) {
            return 5000;
        }
        else {
            return 3000;
        }
    }
    getDBName() {
        if (this.environment === Environments.prod_environment) {
            return 'sances-test';
        }
        else if (this.environment === Environments.dev_environment) {
            return 'sances-test';
        }
        else {
            return 'sances-test';
        }
    }
}
exports.default = new Environment(Environments.dev_environment);
