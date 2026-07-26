import LifecycleExecutor from "../models/LifecycleExecutor.js";

export default class ProcessLifecycleService {

    constructor(pm2, logger) {

        this.pm2 = pm2;
        this.logger = logger;
        this.executor = new LifecycleExecutor(pm2);

    }

    async start(apps) {

        await this.executor.execute(

            apps,

            this.pm2.startExisting.bind(this.pm2),

            "Iniciando"

        );

    }

    async restart(apps) {

        await this.executor.execute(

            apps,

            this.pm2.restart.bind(this.pm2),

            "Reiniciando"

        );

    }

    async stop(apps) {

        await this.executor.execute(

            apps,

            this.pm2.stop.bind(this.pm2),

            "Parando"

        );

    }

    async remove(apps) {

        await this.executor.execute(

            apps,

            this.pm2.delete.bind(this.pm2),

            "Removendo"

        );

    }

}