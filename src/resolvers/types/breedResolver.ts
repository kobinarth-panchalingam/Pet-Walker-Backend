import { Resolvers } from '../../schema/graphql-types';
import { logger } from '../../utils/logger';

export const breedResolver: Resolvers = {
  Breed: {
    pets: ( parent, _, ctx ) => {
      return ctx.prisma.pet.findMany( { where: { breedId: parent.id } } )
        .then( pets => {
          logger.info( `Successfully fetched pets of breed id-${parent.id} name-${parent.name}` );
          return pets;
        } );
    }
  },
  Query: {
    getBreeds: ( _, args, ctx ) => {
      return ctx.prisma.breed.findMany( { where: { petType: args.petType } } )
        .then( breeds => {
          logger.info( `Successfully fetched breeds of count ${breeds.length} for petType-${args.petType}` );
          return breeds;
        } );
    }
  }
};