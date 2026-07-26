import GenericAction from "./GenericAction.js";

export default class StartAction extends GenericAction {
    constructor(app) {
        super(app,
            "▶",
            (name) => `Iniciando ${name}`,
            async (pm2, app) => await pm2.startExisting(app.name)
        );
    }
}