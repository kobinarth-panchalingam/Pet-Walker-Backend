import { Resolvers } from '../generated/graphql';
import { logger } from '../utils/logger';

export const userResolvers: Resolvers = {
  User: {
    pets: ( parent, _, ctx ) => {
      return ctx.prisma.user.findUnique( { where: { id: parent.id }, select: { Pets: true } } )
        .then( user => {
          logger.info( `Successfully fetched pets of user id-${parent.id}, email-${parent.email}` );
          return user.Pets;
        } );
    }
  },
  Query: {
    getUsers: ( _, __, ctx ) => {
      return ctx.prisma.user.findMany()
        .then( users => {
          logger.info( `Successfully fetched all users of count ${users.length}` );
          return users;
        } );
    }
  }
};