import { prisma } from '../database/prisma.js';
import { AuthenticationError } from '../utils/errors';
import { getUserFromToken } from '../utils/jwtUtils';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const createApolloMiddleware = ( server: ApolloServer ) => expressMiddleware( server, {
  context: async( { req } ) => {
    const token = req.headers.authorization || '';
    const user = await getUserFromToken( token );

    // Introspection query is allowed without authentication
    if ( !user && !req.body.query.trim().startsWith( 'query Introspection' ) ) {
      throw new AuthenticationError( 'User not authenticated' );
    }

    return {
      user,
      prisma
    };
  }
} );

export { createApolloMiddleware };
