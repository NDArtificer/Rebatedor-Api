import express from 'express';
import axios from 'axios';
import JwtHandler from './JwtHandler.js';
import Logger from './Logger.js';
import AuthError from './errors/AuthError.js';

class RebatedorAPI {

    constructor(envConfig, cliente, ambiente) {
        this.envConfig = envConfig;
        this.cliente = cliente;
        this.ambiente = ambiente;
        this.ipOrigem = envConfig.getIp(ambiente);
        this.porta = envConfig.getPort(ambiente);
        this.prefixo = envConfig.getPrefixo(ambiente);
        this.clientePorta = envConfig.getClientPort(cliente, ambiente);
        this.logger = new Logger(cliente, ambiente);
        this.databaseConfig = envConfig.getDatabaseConfig(ambiente);
        this.app = express();
        this.app.use(express.json());
    }

    start() {
        this.app.post('/api/:resource', async (req, res) => {
            try {
                const token = req.headers['authorization'];
                const mensagem = req.body;
                const { resource } = req.params;

                this.logger.info({
                    evento: 'REQUISICAO_RECEBIDA',
                    ipOrigem: this.ipOrigem,
                    recurso: resource,
                    jwt: token,
                    mensagem : req.body
                });

                JwtHandler.validarCliente(token.replace('Bearer ', ''), this.cliente, this.clientePorta);

                res.status(200).json({
                    mensagem: req.body
                });
            } catch (err) {
                if (err instanceof AuthError) {
                    res.status(err.status).json({ erro: err.message });
                } else {
                    res.status(400).json({ erro: err.message });
                }
            }
        });

        this.app.listen(this.clientePorta, () => {
            console.log(`Rebatedor ${this.cliente}-${this.ambiente} rodando na porta ${this.clientePorta}`);
        });
    }
}

export default RebatedorAPI;
