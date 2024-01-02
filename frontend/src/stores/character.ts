import { Dispatcher } from "../utils/dispatcher";
import { Store } from "../utils/store";

import type { Actions } from "../actions/index";
import type { ICharacter } from "../models/character";

interface Events {
    added: [ICharacter];
    updated: [ICharacter];
    removed: [ICharacter];
}

export class CharacterStore extends Store<number, ICharacter, Events> {
    constructor(dispatch: Dispatcher<Actions>) {
        super();

        dispatch.register((data: Actions) => this._handleEvents(data));
    }

    private _handleEvents(data: Actions): void {
        switch (data.type) {
            case "read.characters":
                this._onRead(data.payload);
                break;
        }
    }

    private _onRead(characters: ICharacter[]): void {
        const nextKeys = [];

        for (const character of characters) {
            const id = character.id;
            nextKeys.push(id);

            if (this.has(id)) {
                this._onUpdated(character);
                continue;
            }

            this._onAdded(character);
        }

        for (const currentKey of this.keys()) {
            if (nextKeys.includes(currentKey)) continue;

            this._onRemoved(this.get(currentKey)!);
        }
    }

    private _onAdded(character: ICharacter): void {
        if (this.has(character.id)) {
            this._onUpdated(character);
            return;
        }

        this._indexing.set(character.id, character);

        this.emit("added", character);
    }

    private _onUpdated(character: ICharacter): void {
        const currentCharacter = this.get(character.id)!;

        let needEmit = false;

        if (currentCharacter.firstName !== character.firstName) {
            currentCharacter.firstName = character.firstName;
            needEmit = true;
        }

        if (currentCharacter.lastName !== character.lastName) {
            currentCharacter.lastName = character.lastName;
            needEmit = true;
        }

        if (needEmit) this.emit("updated", currentCharacter);
    }

    private _onRemoved(character: ICharacter): void {
        const removedCharacter = this.get(character.id)!;

        const needEmit = this._indexing.delete(character.id);

        if (needEmit) this.emit("removed", removedCharacter);
    }
}
