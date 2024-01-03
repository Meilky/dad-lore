import http from "node:http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";

import { TYPE_DEFS } from "./schema";
import { RESOLVERS } from "./resolvers";

import { DBConnector } from "./connectors/db";

import { CharacterService } from "./services/character";
import { EventService } from "./services/event";

import type { Context } from "./types";

const APP = express();

const HTTP_SERVER = http.createServer(APP);

const DB_CONNECTOR = new DBConnector(
    "dad-lore-db",
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    process.env.DB_NAME as string
);

const SERVER = new ApolloServer<Context>({
    typeDefs: TYPE_DEFS,
    resolvers: RESOLVERS,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: HTTP_SERVER })],
});

await SERVER.start();

APP.use(
    "/api/graphql",
    express.json(),
    expressMiddleware(SERVER, {
        context: async () => {
            return {
                services: {
                    character: new CharacterService(DB_CONNECTOR),
                    event: new EventService(DB_CONNECTOR),
                },
            };
        },
    })
);

await new Promise<void>((resolve) => HTTP_SERVER.listen({ port: 3000 }, resolve));

console.log(`Backend is ready!!!`);
