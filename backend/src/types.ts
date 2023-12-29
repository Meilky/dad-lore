import type { CharacterService } from "./services/character";
import type { EventService } from "./services/event";

export interface Context {
    services: {
        character: CharacterService;
        event: EventService;
    };
}
