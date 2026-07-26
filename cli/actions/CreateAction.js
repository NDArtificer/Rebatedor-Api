import GenericAction from "./GenericAction.js";

export default class CreateAction extends GenericAction {
    constructor(app) {
        super(app,
            "➕",
            (name) => `Criando ${name}`,
            async (pm2, app) => await pm2.create(app)
        );
    }
}