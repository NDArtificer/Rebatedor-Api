import DeploymentProgress from "../models/DeploymentProgress.js";
import DeploymentProgressRenderer from "../ui/DeploymentProgressRenderer.js";
import DeploymentReport from "../models/DeploymentReport.js";

export default class DeploymentExecutor {

    constructor(pm2, logger, options = {}) {

        this.pm2 = pm2;
        this.logger = logger;
        this.options = options;

        this.progress = null;
        this.renderer = new DeploymentProgressRenderer();

    }

    async execute(plan) {

        const report = new DeploymentReport();


        if (this.options.dryRun) {
            plan.print(this.logger);
            this.logger.warning("Dry Run.");
            return report;

        }

        this.progress = new DeploymentProgress(
            plan.actions.map(action => action.app)
        );

        this.renderer.render(this.progress);

        for (const action of plan.actions) {
            await this.executeAction(action, report);

        }

        if (this.options.save) {
            await this.pm2.save();
        }

        report.finish();
        return report;

    }

    async executeAction(action, report) {

        try {

            this.progress.running(action.name);
            this.renderer.render(this.progress);
            this.refresh(this.progress);

            await action.execute(this.pm2);
            const process = await this.pm2.describe(action.name);

            this.progress.success(process);
            this.renderer.render(this.progress);
            this.refresh(this.progress);

            report.addSuccess(action);

        }

        catch (error) {

            this.progress.failure(action.name);
            this.renderer.render(this.progress);
            this.refresh(this.progress);
            report.addFailure(action, error);

        }

    }

    refresh(progress) {
        process.stdout.write("\x1Bc");
        this.renderer.render(progress);
    }

}