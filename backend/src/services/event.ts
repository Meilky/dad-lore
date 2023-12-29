import { createEventFromDB } from "../models/event";

import type { DBConnector } from "../connectors/db";
import type { IDBEvent, IEvent } from "../models/event.ts";

export class EventService {
    private _connector: DBConnector;

    constructor(connector: DBConnector) {
        this._connector = connector;
    }

    public async getEvents(): Promise<IEvent[]> {
        let conn;
        let data: IEvent[] = [];

        try {
            conn = await this._connector.getConnection();

            const rows = await conn.query<IDBEvent[]>("SELECT * FROM Events;");

            for (const row of rows) {
                data.push(createEventFromDB(row));
            }
        } finally {
            if (conn) conn.release();

            return data;
        }
    }
}
