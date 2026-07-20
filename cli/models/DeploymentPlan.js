import DeploymentReport from "./DeploymentReport.js";

export default class DeploymentPlan {

    constructor(actions = []) {
        this.actions = actions;
    }

    add(action) {
        this.actions.push(action);
    }

    isEmpty() {
        return this.actions.length === 0;
    }

    print(logger) {
        logger.title("PLANO DE DEPLOY");
        this.actions.forEach(action => action.print(logger));
    }

    async execute(pm2, logger) {
        const report = new DeploymentReport();
        logger.title("EXECUTANDO DEPLOY");
        for (const action of this.actions) {

            try {
                action.print(logger);
                await action.execute(pm2);
                report.addSuccess(action);
            }
            catch (error) {
                logger.error(error.message);
                report.addFailure(action, error);
            }

        }

        await pm2.save();
        report.finish();
        return report;

    }

}