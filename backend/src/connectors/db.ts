import mariadb from "mariadb";
import type { Pool, PoolConnection } from "mariadb";

export class DBConnector {
    private _pool: Pool;

    constructor(host: string, user: string, password: string, database: string = "db", port: number = 3306) {
        this._pool = mariadb.createPool({
            host,
            user,
            password,
            database,
            port,
            connectionLimit: 5,
        });
    }

    public getConnection(): Promise<PoolConnection> {
        return this._pool.getConnection();
    }
}
