import { Resolvers } from '../generated/graphql';
import { logger } from '../utils/logger';

export const petResolvers: Resolvers = {
  Pet: {
    user: ( parent, _, ctx ) => {
      return ctx.prisma.user.findUnique( { where: { id: parent.userId } } )
        .then( user => {
          logger.info( `Successfully fetched owner of pet id-${parent.id} name-${parent.name}` );
          return user;
        } );
    }
  },
  Query: {
    getPets: ( _, __, ctx ) => {
      return ctx.prisma.pet.findMany()
        .then( pets => {
          logger.info( `Successfully fetched all pets of count ${pets.length}` );
          return pets;
        } );
    }
  },
  Mutation: {
    addPet: ( _, args, ctx ) => {
      return ctx.prisma.pet.create( { data: args.input } )
        .then( pet => {
          logger.info( `Successfully added pet id-${pet.id} name-${pet.name}` );
          return pet;
        } );
    }
  }
};
