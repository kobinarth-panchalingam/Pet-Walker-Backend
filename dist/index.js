import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { typeDefs } from "./src/typeDefs/typeDefs.js";
import { resolvers } from "./src/resolvers/resolvers.js";
import { GraphQLError } from "graphql";
import { prisma } from "./src/prisma/prisma.js";
import authRoutes, { getUserFromToken } from "./src/auth/auth.js";
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/", cors(), 
// expressMiddleware accepts the same arguments:
// an Apollo Server instance and optional configuration options
expressMiddleware(server, {
    context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const user = await getUserFromToken(token);
        if (!user) {
            throw new GraphQLError("User is not authenticated", {
                extensions: {
                    code: "UNAUTHENTICATED",
                    http: {
                        status: 401,
                    },
                },
            });
        }
        return {
            user,
            prisma,
        };
    },
}));
await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
console.log(`🚀 Server ready at ${process.env.PORT}`);
export default server;
