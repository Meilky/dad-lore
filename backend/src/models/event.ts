export interface IEvent {
    id: number;
    description: string;
}

export interface IDBEvent {
    id: number;
    description: string;
}

export function createEventFromDB(dto: IDBEvent): IEvent {
    return dto;
}
