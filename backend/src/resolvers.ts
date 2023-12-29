import type { Context } from "./types";
import type { ICharacter } from "./models/character";
import type { IEvent } from "./models/event";

export const RESOLVERS = {
    Query: {
        characters: async (_parent: unknown, _args: unknown, context: Context): Promise<ICharacter[]> => {
            return context.services.character.getCharacters();
        },
        events: async (_parent: unknown, _args: unknown, context: Context): Promise<IEvent[]> => {
            return context.services.event.getEvents();
        },
    },
};
