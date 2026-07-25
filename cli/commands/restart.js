import DeploymentManager from "../services/DeploymentManager.js";

const manager = new DeploymentManager();
await manager.restart();