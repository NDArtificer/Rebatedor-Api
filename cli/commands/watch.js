import Pm2Service from "../services/Pm2Service.js";

const pm2 = new Pm2Service();

await pm2.connect();

setInterval(async () => {

    const apps = await pm2.list();

    console.clear();

    console.log("REBATEDOR WATCH\n");

    console.table(

        apps.map(app => ({

            Processo: app.name,

            Status: app.pm2_env.status,

            CPU: `${app.monit.cpu}%`,

            Memoria:
                `${(app.monit.memory / 1024 / 1024).toFixed(1)} MB`,

            PID: app.pid,

            Restarts: app.pm2_env.restart_time

        }))

    );

}, 2000);