import ProcessStatus from "../models/ProcessStatus.js";

export default class ProcessStatusMapper {

    map(app) {
        return new ProcessStatus(
            app.name,
            app.pm2_env.version ?? "-",
            app.pm2_env.status,
            app.pid,
            `${app.monit.cpu}%`,
            `${(app.monit.memory / 1024 / 1024).toFixed(1)} MB`,
            app.pm2_env.pm_uptime
                ? new Date(app.pm2_env.pm_uptime).toLocaleString()
                : "-"
        );

    }

    mapAll(apps) {
        return apps
            .filter(app => app.name.endsWith("-API"))
            .map(app => this.map(app));

    }

}