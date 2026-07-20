import pm2 from "pm2";

export default class Pm2Service {

    async connect() {
        return new Promise((resolve, reject) => {
            pm2.connect(err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });

        });

    }

    disconnect() {
        pm2.disconnect();
    }

    async list() {
        return new Promise((resolve, reject) => {
            pm2.list((err, apps) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(apps);
            });
        });

    }

    async describe(name) {
        return new Promise((resolve, reject) => {
            pm2.describe(name, (err, process) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(process?.[0] ?? null);
            });
        });

    }

    async exists(name) {
        return (await this.describe(name)) !== null;
    }

    async create(app) {
        return new Promise((resolve, reject) => {
            pm2.start(app, err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });

    }

    async startExisting(name) {
        return new Promise((resolve, reject) => {
            pm2.restart(name, err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });

    }

    async restart(name) {
        return new Promise((resolve, reject) => {
            pm2.restart(name, err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    async stop(name) {
        return new Promise((resolve, reject) => {
            pm2.stop(name, err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();

            });

        });

    }

    async delete(name) {
        if (!(await this.exists(name))) {
            return;
        }

        return new Promise((resolve, reject) => {
            pm2.delete(name, err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });

    }

    async recreate(app) {
        await this.delete(app.name);
        await this.create(app);
    }

    async save() {
        return new Promise((resolve, reject) => {
            pm2.dump(err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    async flush() {
        return new Promise((resolve, reject) => {
            pm2.flush(err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    async restartAll() {
        const apps = await this.list();
        for (const app of apps) {
            await this.restart(app.name);
        }

    }

    async stopAll() {
        const apps = await this.list();
        for (const app of apps) {
            await this.stop(app.name);
        }

    }

    async deleteAll() {
        const apps = await this.list();
        for (const app of apps) {
            await this.delete(app.name);
        }
    }
}