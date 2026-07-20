import DeploymentAction from "../models/DeploymentAction.js";

export default class UnchangedAction extends DeploymentAction {

    print(logger) {

        logger.success(`${this.name} OK`);

    }

    async execute() {
    }

}