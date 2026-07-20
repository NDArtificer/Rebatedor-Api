export default class Validator {

    validate(config) {

        const errors = [];

        const ports = new Set();

        const ips = new Set();

        for (const [ambiente, dados] of Object.entries(config)) {

            if (!dados.IP) {

                errors.push(`${ambiente}: IP não informado`);

            }

            if (!dados.PREFIXO.startsWith("/")) {

                errors.push(`${ambiente}: PREFIXO inválido`);

            }

            for (const [cliente, cli] of Object.entries(dados.CLIENTES)) {

                if (ports.has(cli.PORTA_CLIENTE)) {

                    errors.push(
                        `Porta duplicada ${cli.PORTA_CLIENTE}`
                    );

                }

                ports.add(cli.PORTA_CLIENTE);

            }

        }

        return errors;

    }

}