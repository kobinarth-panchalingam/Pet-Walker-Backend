import { router as AuthRoutes } from './src/auth/auth';
import { AUTH } from './src/constants/routes';
import { Context, createApolloMiddleware } from './src/middlewares/apolloMiddleware';
import { errorHandler, formatError } from './src/middlewares/errorHandler';
import { resolvers } from './src/resolvers';
import { schema } from './src/typeDefs';
import { logger } from './src/utils/logger';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { addResolversToSchema } from '@graphql-tools/schema';
import cors from 'cors';
import express from 'express';
import http from 'http';
const app = express();
const httpServer = http.createServer( app );

const server = new ApolloServer<Context>( {
  schema: addResolversToSchema( { schema, resolvers } ),
  formatError,
  plugins: [ ApolloServerPluginDrainHttpServer( { httpServer } ) ],
  introspection: true,
  includeStacktraceInErrorResponses: false
} );
await server.start();

app.use( express.json( { limit: '50mb' } ) );
app.use( cors( { origin: [ process.env.FRONTEND_URL ] } ) );
app.use( AUTH, AuthRoutes );
app.use( createApolloMiddleware( server ) );
app.use( errorHandler );

await new Promise<void>( ( resolve ) => httpServer.listen( { port: process.env.PORT || 4000 }, resolve ) );
logger.info( `🚀 Server ready at ${process.env.PORT}` );

export default server;
