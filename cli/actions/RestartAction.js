import GenericAction from "./GenericAction.js";

export default class RestartAction extends GenericAction {

    constructor(app, changes) {

        super(app,
            "♻",
            (name) => `Recriando ${name}`,
            async (pm2, app) => await pm2.recreate(app)
        );

        this.changes = changes;

    }

    print(logger) {
        super.print(logger);
        this.changes.forEach(change => {
            logger.info(`${change.field}: ${change.oldValue} -> ${change.newValue}`);
        });
    }

}