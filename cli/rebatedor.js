#!/usr/bin/env node

const command = process.argv[2];

switch (command) {

    case "deploy":
        await import("./commands/deploy.js");
        break;

    case "plan":
        await import("./commands/plan.js");
        break;

    case "validate":
        await import("./commands/validate.js");
        break;

    case "watch":
        await import("./commands/watch.js");
        break;

    case "status":
        await import("./commands/status.js");
        break;

    case "logs":
        await import("./commands/logs.js");
        break;

    case "stop":
        await import("./commands/stop.js");
        break;

    case "restart":
        await import("./commands/restart.js");
        break;

    case "validate":
        await import("./commands/validate.js");
        break;
    default:
        console.log(`
Comandos disponíveis:

deploy
plan
validate
watch
status
logs
restart
stop
`);
}