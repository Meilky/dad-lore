export const TYPE_DEFS = `
type Character {
	id: Int!
	firstName: String!
	lastName: String!
}

type Event {
	id: Int!
	description: String!
}

type Query {
	characters: [Character]!
	events: [Event]!
}
`;
