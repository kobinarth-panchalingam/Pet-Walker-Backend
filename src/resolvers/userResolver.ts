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
    getUser: ( _, __, ctx ) => {
      return ctx.prisma.user.findUnique( { where: { id: ctx.user.id }, include: { EmergencyContacts: true } } )
        .then( user => {
          const { EmergencyContacts, ...rest } = user;
          logger.info( `Successfully fetched user id-${user.id}, email-${user.email}` );
          return { ...rest, emergencyContacts: EmergencyContacts };
        } );
    },
    getUsers: ( _, __, ctx ) => {
      return ctx.prisma.user.findMany( { include: { EmergencyContacts: true } } )
        .then( users => {
          logger.info( `Successfully fetched all users of count ${users.length}` );
          return users;
        } );
    }
  },
  Mutation: {
    updateUser: async( _, args, ctx ) => {
      const { firstName, lastName, phoneNumber, dob, street, city, district, zipCode, profilePhoto, emergencyContacts } = args.input;

      // Update user in the database
      const updatedUser = await ctx.prisma.user.update( {
        where: { id: ctx.user.id },
        data: { firstName, lastName, phoneNumber, dob, street, city, district, zipCode, profilePhoto },
        include: { EmergencyContacts: true }
      } );
      logger.info( `Successfully updated user id-${updatedUser.id}, email-${updatedUser.email}` );

      // Delete emergency contacts that are not in the updated list
      if ( emergencyContacts !== undefined ) {
        updatedUser.EmergencyContacts.forEach( async( contact ) => {
          if ( !emergencyContacts.some( c => c.phoneNumber === contact.phoneNumber ) ) {
            await ctx.prisma.emergencyContact.delete( { where: { phoneNumber: contact.phoneNumber } } );
          }
        } );
      }

      // Update emergency contacts
      if ( emergencyContacts && emergencyContacts.length > 0 ) {
        await Promise.all(
          emergencyContacts.map( async( contact ) => {
            const { name, phoneNumber } = contact;
            await ctx.prisma.emergencyContact.upsert( {
              where: {
                phoneNumber
              },
              update: {
                name
              },
              create: {
                name,
                phoneNumber,
                userId: ctx.user.id
              }
            } );
          } )
        );
      }
      logger.info( `Successfully updated emergency contacts of user id-${updatedUser.id}, email-${updatedUser.email}` );

      // Fetch updated user with emergency contacts
      const userWithContacts = await ctx.prisma.user.findUnique( {
        where: { id: ctx.user.id },
        include: { EmergencyContacts: true }
      } );

      logger.info( `Successfully fetched user id-${userWithContacts.id}, email-${userWithContacts.email}` );
      return userWithContacts;
    }
  }
};