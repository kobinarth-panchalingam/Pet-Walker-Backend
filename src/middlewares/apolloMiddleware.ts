import { prisma } from '../database/prisma';
import { getUserFromToken } from '../utils/jwtUtils';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { GraphQLError } from 'graphql';

const createApolloMiddleware = ( server: ApolloServer ) => expressMiddleware( server, {
  context: async( { req } ) => {
    const token = req.headers.authorization || '';
    const user = await getUserFromToken( token );

    // Introspection query is allowed without authentication
    if ( !user && !req.body.query.trim().startsWith( 'query Introspection' ) ) {
      throw new GraphQLError( 'User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: {
            status: 401
          }
        }
      } );
    }

    return {
      user,
      prisma
    };
  }
} );

export { createApolloMiddleware };