export default class DeploymentExecutor {

    constructor(pm2, logger) {
        this.pm2 = pm2;
        this.logger = logger;

    }

    async execute(plan, options) {
        plan.print(this.logger);
        if (options.dryRun) {
            this.logger.warning("Dry Run.");
            return null;
        }
        const report = await plan.execute(this.pm2, this.logger);
        if (options.save) {
            await this.pm2.save();
        }
        return report;
    }

}