import DeploymentAction from "../models/DeploymentAction.js";

export default class CreateAction extends DeploymentAction {

    print(logger) {

        logger.action("➕", `Criando ${this.name}`);

    }

    async execute(pm2) {

        await pm2.create(this.app);

    }

}