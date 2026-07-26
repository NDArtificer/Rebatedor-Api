import DeploymentAction from "../models/DeploymentAction.js";

export default class GenericAction extends DeploymentAction {

    constructor(app, icon, messageFn, executeFn) {

        super(app);

        this.icon = icon;
        this.messageFn = messageFn;
        this._executeFn = executeFn;

    }

    print(logger) {
        const text = this.messageFn ? this.messageFn(this.name, this.app) : this.name;
        logger.action(this.icon, text);
    }

    async execute(pm2) {
        if (this._executeFn) {
            await this._executeFn(pm2, this.app);
        }
    }

}
