import pkg from "pg";
import BaseConnection from "./BaseConnection.js";

const { Client } = pkg;

export default class PostgresConnection extends BaseConnection {

    constructor() {
        super(async (config) => {
            const client = new Client(config);
            return await client.connect();
        });
    }

}