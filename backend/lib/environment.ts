require('dotenv').config();

enum Environments {
    local_environment = 'local',
    dev_environment = 'dev',
    prod_environment = 'prod'
}

class Environment {
    private environment: String;

    constructor(environment: String) {
        this.environment = environment;
    }

    getDBUri() : string {
        return (process.env.MDB_URI+this.getDBName()+"?retryWrites=true&w=majority")
    }
    
    getPort(): Number {
        if (this.environment === Environments.prod_environment) {
            return 8081;
        } else if (this.environment === Environments.dev_environment) {
            return 5000;
        } else {
            return 3000;
        }
    }

    getDBName(): String {
        if (this.environment === Environments.prod_environment) {
            return 'sances-test';
        } else if (this.environment === Environments.dev_environment) {
            return 'sances-test';
        } else {
            return 'sances-test';
        }
    }
}

export default new Environment(Environments.dev_environment);