import DeploymentProgressRenderer from "../ui/DeploymentProgressRenderer.js";
import DeploymentProgress from "./DeploymentProgress.js";

export default class LifecycleExecutor {

    constructor(pm2) {
        this.pm2 = pm2;
        this.renderer = new DeploymentProgressRenderer();

    }

    async execute(apps, callback, actionName) {

        const progress = new DeploymentProgress(apps);
        this.refresh(progress);
        for (const app of apps) {
            progress.running(app.name, actionName);
            await callback(app.name);
            const current = await this.pm2.describe(app.name);
            progress.success(current, actionName);
            this.refresh(progress);

        }

    }

    refresh(progress) {
        process.stdout.write("\x1Bc");
        this.renderer.render(progress);
    }

}