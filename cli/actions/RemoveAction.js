import DeploymentAction from "../models/DeploymentAction.js";

export default class RemoveAction extends DeploymentAction {

    print(logger) {

        logger.action("🗑", `Removendo ${this.name}`);

    }

    async execute(pm2) {

        await pm2.delete(this.name);

    }

}