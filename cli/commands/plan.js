import EcosystemGenerator from "../services/EcosystemGenerator.js";
import DeploymentPlanner from "../services/DeploymentPlanner.js";
import Pm2Service from "../services/Pm2Service.js";

const pm2 = new Pm2Service();

await pm2.connect();

const desired = new EcosystemGenerator().generate();

const running = await pm2.list();

const planner = new DeploymentPlanner();

const plan = planner.plan(desired, running);

console.log("\n========== DEPLOY PLAN ==========\n");

plan.create.forEach(a => {
    console.log("➕", a.name);
});

plan.start.forEach(a => {
    console.log("▶", a.name);
});

plan.restart.forEach(item => {
    console.log("♻", item.app.name);
    item.changes.forEach(change => {
        console.log(
            `    ${change.field}: ${change.oldValue} -> ${change.newValue}`
        );

    });

});

plan.remove.forEach(a => {
    console.log("🗑", a.name);
});

plan.unchanged.forEach(a => {
    console.log("✔", a.name);
});

console.log();
pm2.disconnect();