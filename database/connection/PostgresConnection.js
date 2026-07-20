import pkg from "pg";

const { Client } = pkg;

export default class PostgresConnection {

    async connect(config) {
        const client = new Client(config);
        return await client.connect();
    }

}