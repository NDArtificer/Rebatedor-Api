export default class DeploymentAction {

    constructor(app) {

        this.app = app;

    }

    get name() {

        return this.app.name;

    }

    get env() {

        return this.app.env;

    }

    get script() {

        return this.app.script;

    }

    async execute(pm2) {

        throw new Error("execute() não implementado.");

    }

    print(logger) {

        throw new Error("print() não implementado.");

    }

    toJSON() {

        return {

            type: this.constructor.name,
            app: this.app

        };

    }

    toString() {

        return `${this.constructor.name}(${this.name})`;

    }

}