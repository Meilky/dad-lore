<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type { ICharacter } from "../models/character";
    import type { CharacterStore } from "../stores/character";

    export let characterStore: CharacterStore;

    let characters: ICharacter[] = [];

    function onAdded(character: ICharacter): void {
        characters.push(character);

		characters = characters;
    }

    function onUpdated(character: ICharacter): void {
        const v = characters.find((v) => v.id === character.id);

        if (v === undefined) return;

        v.firstName = character.firstName;
        v.lastName = character.lastName;
    }

    function onRemoved(character: ICharacter): void {
        const v = characters.findIndex((v) => v.id === character.id);

        if (v === -1) return;

        characters.splice(v, 1);
    }

    onMount(() => {
        for (const character of characterStore.values()) {
            onAdded(character);
        }

        characterStore.on("added", onAdded);
        characterStore.on("updated", onUpdated);
        characterStore.on("removed", onRemoved);
    });

    onDestroy(() => {
        characterStore.off("added", onAdded);
        characterStore.off("updated", onAdded);
        characterStore.off("removed", onRemoved);
    });
</script>

<h1>Hello World</h1>
<ul>
    {#each characters as character (character.id)}
        <li>{character.id}: {character.firstName} {character.lastName}</li>
    {/each}
</ul>
