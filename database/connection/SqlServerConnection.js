import sql from "mssql";

export default class SqlServerConnection {

    async connect(config) {
        return await sql.connect(config);
    }

}