import { router as authRoutes } from './src/auth/auth.js';
import { createApolloMiddleware } from './src/middlewares/apolloMiddleware.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { resolvers } from './src/resolvers/index.js';
import { typeDefs } from './src/typeDefs/index.js';
import { logger } from './src/utils/logger.js';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import http from 'http';

interface MyContext {
  token?: string;
}

const app = express();
const httpServer = http.createServer( app );
const server = new ApolloServer<MyContext>( {
  typeDefs,
  resolvers,
  plugins: [ ApolloServerPluginDrainHttpServer( { httpServer } ) ],
  introspection: true
} );
await server.start();

app.use( express.json() );
app.use( cors( { origin: [ process.env.FRONTEND_URL ] } ) );
app.use( '/auth', authRoutes );
app.use( createApolloMiddleware( server ) );
app.use( errorHandler );

await new Promise<void>( ( resolve ) => httpServer.listen( { port: process.env.PORT || 4000 }, resolve ) );
logger.info( `🚀 Server ready at ${process.env.PORT}` );

export default server;
