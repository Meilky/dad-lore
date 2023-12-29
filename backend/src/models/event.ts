export interface IEvent {
    id: number;
    description: string;
}

export class EventModel implements IEvent {
    public id: number;
    public description: string;

    constructor(id: number, description: string) {
        this.id = id;
        this.description = description;
    }
}

export interface IDBEvent {
    id: number;
    description: string;
}

export function createEventFromDB(dto: IDBEvent): EventModel {
    return new EventModel(dto.id, dto.description);
}
