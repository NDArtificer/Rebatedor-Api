import fs from 'fs';
import * as yaml from 'js-yaml';

class EnvConfig {
    constructor() {
        this.config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));
    }

    getPrefixo(ambiente) {
        return this.config[ambiente].PREFIXO;
    }

    getPort(ambiente) {
        return this.config[ambiente].PORTA;
    }

    getClientPort(cliente, ambiente) {
        return this.config[ambiente].CLIENTES[cliente].PORTA_CLIENTE;
    }
    getIp(ambiente) {
        return this.config[ambiente].IP;
    }

    getDatabaseConfig(ambiente) {
        return this.config[ambiente].DATABASE;
    }
}

export default EnvConfig;