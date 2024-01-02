import type { ICharacter } from "../models/character.js";
import type { Action } from "./types.ts";

export type ReadCharactersAction = Action<"read.characters", ICharacter[]>

export type Actions = ReadCharactersAction;
