import GenericAction from "./GenericAction.js";

export default class RemoveAction extends GenericAction {
    constructor(app) {
        super(app,
            "🗑",
            (name) => `Removendo ${name}`,
            async (pm2, app) => await pm2.delete(app.name)
        );
    }
}