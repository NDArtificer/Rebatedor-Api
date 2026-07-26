import sql from "mssql";
import BaseConnection from "./BaseConnection.js";

export default class SqlServerConnection extends BaseConnection {

    constructor() {
        super((config) => sql.connect(config));
    }

}