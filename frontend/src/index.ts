import { Dispatcher } from "./utils/dispatcher";

import { readCharacters } from "./actions/character";

import { CharacterStore } from "./stores/character";

import AppView from "./views/app.svelte";

import type { Actions } from "./actions";

const DISPATCH = new Dispatcher<Actions>();

const CHARACTER_STORE = new CharacterStore(DISPATCH);

const APP_VIEW = new AppView({
	target: document.body,
	props: {
		characterStore: CHARACTER_STORE,
	},
});

readCharacters(DISPATCH);

export default APP_VIEW;
