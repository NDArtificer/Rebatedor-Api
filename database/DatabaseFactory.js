import DatabaseType from "./DatabaseType.js";

import PostgresConnection from "./connection/PostgresConnection.js";
import SqlServerConnection from "./connection/SqlServerConnection.js";

export default class DatabaseFactory {

    static connections = new Map();

    static async create(config, connectionName) {

        if (this.connections.has(connectionName)) {
            return this.connections.get(connectionName);
        }

        const db = config.databases[connectionName];

        let connection;

        switch (db.type) {
            case DatabaseType.POSTGRES:
                connection = await new PostgresConnection().connect(db);
                break;

            case DatabaseType.SQLSERVER:
                connection = await new SqlServerConnection().connect(db);
                break;

            default:
                throw new Error("Banco não suportado.");
        }

        this.connections.set(connectionName, connection);

        return connection;
    }

}