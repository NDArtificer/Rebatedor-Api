import { version } from "node:os";

export default class DeploymentProgress {

    constructor(apps = []) {

        this.rows = apps.map(app => ({
            name: app.name,
            version: app.version ?? "-",
            status: app.pm2_env?.status ?? "unknown",
            action: "Aguardando",

            pid: app.pid ?? "-",

            cpu: app.monit
                ? `${app.monit.cpu}%`
                : "-",
            memory: app.monit
                ? `${(app.monit.memory / 1024 / 1024).toFixed(1)} MB`
                : "-"

        }));

    }

    find(name) {

        return this.rows.find(r => r.name === name);

    }

    running(name, action = "Executando") {

        const row = this.find(name);

        if (!row)
            return;

        row.action = action;

    }

    success(process, action = "Concluído") {

        const row = this.find(process.name);

        if (!row)
            return;
        row.version = process.pm2_env?.version ?? "";
        row.status = process.pm2_env.status;
        row.action = action;
        row.pid = process.pid;
        row.cpu = `${process.monit.cpu}%`;
        row.memory =
            `${(process.monit.memory / 1024 / 1024).toFixed(1)} MB`;

    }

    failure(name) {

        const row = this.find(name);

        if (!row)
            return;

        row.action = "Falhou";

    }

}