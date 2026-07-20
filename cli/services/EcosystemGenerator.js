import EnvConfig from "../../EnvConfig.js";

export default class EcosystemGenerator {

    generate() {
        const env = new EnvConfig();
        const apps = [];
        for (const [ambiente, dados] of Object.entries(env.config)) {
            for (const [cliente] of Object.entries(dados.CLIENTES)) {
                apps.push({
                    name: `${cliente}-${ambiente}-API`,
                    script: "./Rebatedor.js",
                    env: {
                        AMBIENTE: ambiente,
                        CLIENTE: cliente,
                        IP: env.getIp(ambiente),
                        PREFIXO: env.getPrefixo(ambiente),
                        PORTA: env.getPort(ambiente),
                        PORTA_CLIENTE: env.getClientPort(cliente, ambiente),
                        DATABASE: env.getDatabaseConfig(ambiente)
                    }
                });
            }
        }
        console.log(`Aplicações geradas: ${apps.length}`);
        return apps;
    }
}