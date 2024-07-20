import { Resolvers } from '../../generated/graphql';
import { logger } from '../../utils/logger';

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
    getUser: ( _, __, ctx ) => {
      return ctx.prisma.user.findUnique( { where: { id: ctx.user.id } } )
        .then( user => {
          logger.info( `Successfully fetched user id-${user.id}, email-${user.email}` );
          return user;
        } );
    },
    getUsers: ( _, __, ctx ) => {
      return ctx.prisma.user.findMany( )
        .then( users => {
          logger.info( `Successfully fetched all users of count ${users.length}` );
          return users;
        } );
    }
  },
  Mutation: {
    updateUser: async( _, args, ctx ) => {
      const { firstName, lastName, phoneNumber, dob, street, city, district, zipCode, profilePhoto, emergencyContacts } = args.input;

      let uniqueContacts = [];
      // Get unique emergency contacts
      if ( emergencyContacts && emergencyContacts.length > 0 ) {
        const contactMap = emergencyContacts.reduce( ( acc, current ) => {
          acc[current.phoneNumber] = current;
          return acc;
        }, {} );
        uniqueContacts = Object.values( contactMap );
      }

      // Update user in the database
      const updatedUser = await ctx.prisma.user.update( {
        where: { id: ctx.user.id },
        data: { firstName, lastName, phoneNumber, dob, street, city, district, zipCode, profilePhoto, emergencyContacts: uniqueContacts }
      } );
      logger.info( `Successfully updated user id-${updatedUser.id}, email-${updatedUser.email}` );

      // Fetch updated user with emergency contacts
      const user = await ctx.prisma.user.findUnique( {
        where: { id: ctx.user.id }
      } );
      logger.info( `Successfully fetched user id-${user.id}, email-${user.email}` );

      return {
        code: '200',
        success: true,
        message: 'User updated successfully',
        data: user
      };
    }
  }
};