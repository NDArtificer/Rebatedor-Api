import EnvConfig from "./EnvConfig.js";
import RebatedorAPI from "./RebatedorAPI.js";

const envConfig = new EnvConfig();

const cliente = process.env.CLIENTE;
const ambiente = process.env.AMBIENTE;

if (!cliente || !ambiente) {
    throw new Error("CLIENTE ou AMBIENTE não definidos.");
}

const rebatedor = new RebatedorAPI(
    envConfig,
    cliente,
    ambiente
);

await rebatedor.start();