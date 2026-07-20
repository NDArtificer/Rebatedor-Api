import DeploymentAction from "../models/DeploymentAction.js";

export default class StartAction extends DeploymentAction {

    print(logger) {

        logger.action("▶", `Iniciando ${this.name}`);

    }

    async execute(pm2) {

        await pm2.startExisting(this.name);

    }

}