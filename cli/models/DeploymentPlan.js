export default class DeploymentPlan {

    constructor(actions = []) {
        this.actions = actions;
    }

    add(action) {
        this.actions.push(action);
    }

    isEmpty() {
        return this.actions.length === 0;
    }

    print(logger) {
        logger.title("PLANO DE DEPLOY");
        this.actions.forEach(action =>
            action.print(logger)
        );

    }

}