import Logger from "./Logger.js";
import Pm2Service from "./Pm2Service.js";
import EcosystemGenerator from "./EcosystemGenerator.js";
import DeploymentPlanner from "./DeploymentPlanner.js";
import DeploymentExecutor from "./DeploymentExecutor.js";
import ProcessLifecycleService from "./ProcessLifecycleService.js";
import ProcessStatusService from "./ProcessStatusService.js";
import TableRenderer from "../ui/TableRender.js";
import DeploymentOptions from "../models/DeploymentOptions.js";
import FileService from "./FileService.js";
import LifecycleExecutor from "../models/LifecycleExecutor.js";
import DeploymentProgress from "../models/DeploymentProgress.js";
import DeploymentProgressRenderer from "../ui/DeploymentProgressRenderer.js";

export default class DeploymentManager {

    constructor(options = new DeploymentOptions()) {
        this.options = options;
        this.logger = new Logger(options.verbose);
        this.pm2 = new Pm2Service();
        this.generator = new EcosystemGenerator();
        this.planner = new DeploymentPlanner();
        this.renderer = new TableRenderer();
        this.fileService = new FileService();
        this.executor = new DeploymentExecutor(this.pm2, this.logger);
        this.lifecycle = new ProcessLifecycleService(this.pm2, this.logger);
        this.statusService = new ProcessStatusService(this.pm2);

    }

    async deploy() {
        await this.pm2.connect();
        try {
            const desired = this.generator.generate();
            const running = await this.pm2.list();
            const plan = this.planner.plan(desired, running);
            const report = await this.executor.execute(plan, this.options);
            if (report)
                this.showReport(report);

        } finally {
            this.pm2.disconnect();
        }

    }

    async restart() {
        await this.pm2.connect();
        try {
            const apps = (await this.pm2.list())
                .filter(app => app.name.endsWith("-API"));
            await this.lifecycle.restart(apps);
        }
        finally {
            this.pm2.disconnect();
        }

    }

    async stop() {
        await this.pm2.connect();
        try {
            const apps = (await this.pm2.list())
                .filter(app => app.name.endsWith("-API"));
            await this.lifecycle.stop(apps);
            this.fileService.removeDirectory("./logs");
        }
        finally {
            this.pm2.disconnect();
        }

    }

    async status() {
        try {
            await this.statusService.render(
                this.renderer,
                "PROCESS STATUS"
            );
        } finally {
            this.pm2.disconnect();
        }

    }

    showReport(report) {
        this.logger.title("                                        RESUMO");
        this.logger.success(`Executadas : ${report.success.length}`);
        if (report.failed.length) {
            this.logger.error(`Falhas : ${report.failed.length}`);
        }
        this.logger.info(`Tempo : ${report.duration} ms`);
        this.logger.line();
    }

}