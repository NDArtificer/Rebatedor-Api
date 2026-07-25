export default class ProcessLifecycleService {

    constructor(pm2, logger) {

        this.pm2 = pm2;
        this.logger = logger;

    }

    async start(apps) {
        for (const app of apps) {
            this.logger.info(`Iniciando ${app.name}`);
            await this.pm2.start(app);
        }

    }

    async stop(apps) {

        for (const app of apps) {
            this.logger.info(`Parando ${app.name}`);
            await this.pm2.stop(app.name);
        }

    }

    async restart(apps) {
        for (const app of apps) {
            this.logger.info(`Reiniciando ${app.name}`);
            await this.pm2.restart(app.name);
        }

    }

}