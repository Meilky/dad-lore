import { createCharacterFromDB } from "../models/character";

import type { DBConnector } from "../connectors/db";
import type { ICharacter, IDBCharacter } from "../models/character";

export class CharacterService {
    private _connector: DBConnector;

    constructor(connector: DBConnector) {
        this._connector = connector;
    }

    public async getCharacters(): Promise<ICharacter[]> {
        let conn;
        let data: ICharacter[] = [];

        try {
            conn = await this._connector.getConnection();

            const rows = await conn.query<IDBCharacter[]>("SELECT * FROM Characters;");

            for (const row of rows) {
                data.push(createCharacterFromDB(row));
            }
        } finally {
            if (conn) conn.release();

            return data;
        }
    }
}
