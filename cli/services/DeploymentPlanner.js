import DeploymentPlan from "../models/DeploymentPlan.js";

import CreateAction from "../actions/CreateAction.js";
import StartAction from "../actions/StartAction.js";
import RestartAction from "../actions/RestartAction.js";
import RemoveAction from "../actions/RemoveAction.js";
import UnchangedAction from "../actions/UnchangedAction.js";

import DiffEngine from "./DiffEngine.js";

export default class DeploymentPlanner {

    constructor() {
        this.diff = new DiffEngine();
    }

    plan(desiredApps, runningApps) {
        const desired = new Map(
            desiredApps.map(a => [a.name, a])
        );
        const running = new Map(
            runningApps.map(a => [a.name, a])
        );
        const plan = new DeploymentPlan();
        for (const app of desiredApps) {
            const current = running.get(app.name);
            if (!current) {
                plan.add(new CreateAction(app));
                continue;
            }

            if (
                current.pm2_env.status === "stopped" ||
                current.pm2_env.status === "errored"
            ) {
                plan.add(new StartAction(app));
                continue;
            }

            const changes = this.diff.compare(
                current.pm2_env.env,
                app.env
            );

            if (changes.length) {
                plan.add(
                    new RestartAction(app, changes)
                );
            }
            else {
                plan.add(
                    new UnchangedAction(app)
                );
            }

        }

        for (const app of runningApps) {
            if (!desired.has(app.name)) {
                plan.add(
                    new RemoveAction(app)
                );
            }
        }
        return plan;

    }

}