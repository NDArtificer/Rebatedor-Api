import DeploymentAction from "../models/DeploymentAction.js";

export default class RestartAction extends DeploymentAction {

    constructor(app, changes) {

        super(app);

        this.changes = changes;

    }

    print(logger) {

        logger.action("♻", `Recriando ${this.name}`);

        this.changes.forEach(change => {

            logger.info(
                `${change.field}: ${change.oldValue} -> ${change.newValue}`
            );

        });

    }

    async execute(pm2) {

        await pm2.recreate(this.app);

    }

}