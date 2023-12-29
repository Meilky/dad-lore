export interface ICharacter {
    id: number;
    firstName: string;
    lastName: string;
}

export class CharacterModel implements ICharacter {
    public id: number;
    public firstName: string;
    public lastName: string;

    constructor(id: number, firstName: string, lastName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export interface IDBCharacter {
    id: number;
    first_name: string;
    last_name: string;
}

export function createCharacterFromDB(dto: IDBCharacter): CharacterModel {
    return new CharacterModel(dto.id, dto.first_name, dto.last_name);
}
