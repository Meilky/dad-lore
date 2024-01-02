import type { Dispatcher } from "../utils/dispatcher.ts";
import type { Actions } from "./index.ts";

export async function readCharacters(dispatch: Dispatcher<Actions>): Promise<void> {
	try {
		const res = await fetch("/api/graphql", {
			method: "POST",
			body: JSON.stringify({ query: "query { characters { id firstName lastName } }" }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		if (data.errors) {
			throw data.errors;
		}

		dispatch.dispatch({ type: "read.characters", payload: data.data.characters });
	} catch (error) {
		console.error(error);
	}
}
