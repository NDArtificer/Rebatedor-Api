import AuthError from "./errors/AuthError.js";

class JwtHandler {
    static decodeHeader(token) {
        const [headerB64] = token.split('.');
        const headerJson = Buffer.from(headerB64, 'base64').toString('utf8');
        return JSON.parse(headerJson);
    }

    static getCliente(token) {
        const header = this.decodeHeader(token);
        return header.cliente;
    }

    static validarCliente(token, clienteEsperado, porta) {
        const clienteJwt = this.getCliente(token);
        if (clienteJwt !== clienteEsperado) {
            throw new AuthError(
                `Cliente inválido: JWT indica ${clienteJwt}, mas esta porta (${porta}) é do ${clienteEsperado}`,
                401
            );
        }
        return clienteJwt;
    }
}

export default JwtHandler;
