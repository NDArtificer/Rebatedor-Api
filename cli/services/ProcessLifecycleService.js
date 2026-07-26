import LifecycleExecutor from "../models/LifecycleExecutor.js";

export default class ProcessLifecycleService {

    constructor(pm2, logger) {

        this.pm2 = pm2;
        this.logger = logger;
        this.executor = new LifecycleExecutor(pm2);

    }

    async start(apps) {

        await this.runAction("Iniciando", this.pm2.startExisting.bind(this.pm2), apps);

    }

    async restart(apps) {

        await this.runAction("Reiniciando", this.pm2.restart.bind(this.pm2), apps);

    }

    async stop(apps) {

        await this.runAction("Parando", this.pm2.stop.bind(this.pm2), apps);

    }

    async remove(apps) {

        await this.runAction("Removendo", this.pm2.delete.bind(this.pm2), apps);

    }

    async runAction(actionName, callback, apps) {

        await this.executor.execute(apps, callback, actionName);

    }

}