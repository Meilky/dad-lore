export interface ICharacter {
    id: number;
    firstName: string;
    lastName: string;
}

export interface IDBCharacter {
    id: number;
    first_name: string;
    last_name: string;
}

export function createCharacterFromDB(dto: IDBCharacter): ICharacter {
    const character = {
        id: dto.id,
        firstName: dto.first_name,
        lastName: dto.last_name,
    };

    return character;
}
