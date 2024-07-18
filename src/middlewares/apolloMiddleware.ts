import { prisma } from '../database/prisma';
import { AuthenticationError } from '../utils/errors';
import { getUserFromToken, JwtPayload } from '../utils/jwtUtils';

import { ApolloServer, BaseContext } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { PrismaClient } from '@prisma/client';

interface Context extends BaseContext {
  user: JwtPayload | null;
  prisma: PrismaClient
}

const createApolloMiddleware = ( server: ApolloServer<Context> ) => expressMiddleware( server, {
  context: async( { req } ): Promise<Context> => {
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

export { createApolloMiddleware, Context };
