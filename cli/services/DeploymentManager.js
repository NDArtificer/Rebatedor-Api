import Logger from "./Logger.js";
import Pm2Service from "./Pm2Service.js";
import EcosystemGenerator from "./EcosystemGenerator.js";
import DeploymentPlanner from "./DeploymentPlanner.js";
import DeploymentOptions from "../models/DeploymentOptions.js";
import ProcessStatusMapper from "../mappers/ProcessStatusMapper.js";
import TableRenderer from "../ui/TableRender.js";
import FileService from "./FileService.js";

export default class DeploymentManager {

    constructor(options = new DeploymentOptions()) {
        this.options = options;
        this.logger = new Logger(options.verbose);
        this.pm2 = new Pm2Service();
        this.generator = new EcosystemGenerator();
        this.planner = new DeploymentPlanner();
        this.mapper = new ProcessStatusMapper();
        this.renderer = new TableRenderer();
    }

    async deploy() {
        await this.pm2.connect();
        try {

            const desired = this.generator.generate();
            const running = await this.pm2.list();
            const plan = this.planner.plan(
                desired,
                running
            );
            plan.print(this.logger);
            if (this.options.dryRun) {
                this.logger.warning("Dry Run.");
                return;
            }

            const report = await plan.execute(
                this.pm2,
                this.logger
            );

            if (this.options.save) {
                await this.pm2.save();
            }
            await this.status();
            this.showReport(report);

        }
        finally {
            this.pm2.disconnect();
        }

    }

   async restart() {
        try {
            await this.pm2.connect();
            const apps = await this.pm2.list();
            for (const app of apps) {
                if (app.name.endsWith("-API")) {
                    console.log(`Reiniciando ${app.name}`);
                    await this.pm2.restart(app.name);
                }

            }
            await this.status();
        } finally {
            await this.pm2.disconnect();
        }
    }

    async status() {
        try {
            await this.pm2.connect();
            const apps = await this.pm2.list();
            this.renderer.render("Process Status", this.mapper.mapAll(apps));
        } finally {
            await this.pm2.disconnect();
        }
    }

    async stop() {
        try {
            await this.pm2.connect();
            const apps = await this.pm2.list();
            for (const app of apps) {
                console.log(`Parando ${app.name}`);
                await this.pm2.stop(app.name);
            }
            await this.status();
        } finally {
            const fileService = new FileService();
            fileService.removeDirectory("./logs");
           await this.pm2.disconnect();
        }
    }

    showReport(report) {
        this.logger.title("RESUMO");
        this.logger.success(
            `Executadas: ${report.success.length}`
        );

        if (report.failed.length) {
            this.logger.error(
                `Falhas: ${report.failed.length}`
            );
        }

        this.logger.info(
            `Tempo: ${report.duration} ms`
        );

    }

}