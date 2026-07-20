import Pm2Service from "../services/Pm2Service.js";

const pm2 = new Pm2Service();

await pm2.connect();

const apps = await pm2.list();

for (const app of apps) {

    if (app.name.endsWith("-API")) {
        console.log(`Reiniciando ${app.name}`);
        await pm2.restart(app.name);

    }

}

pm2.disconnect();