import { spawn } from "child_process";

const args = process.argv.slice(3);

let processName = null;
let lines = "100";

for (let i = 0; i < args.length; i++) {

    if (args[i] === "--lines") {
        lines = args[++i];
    } else {
        processName = args[i];
    }

}

const command = [
    "pm2",
    "logs"
];

if (processName) {
    command.push(processName);
}

command.push("--lines");
command.push(lines);

const child = spawn("npx", command, {
    stdio: "inherit",
    shell: true
});

child.on("close", process.exit);