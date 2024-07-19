import { Resolvers } from '../generated/graphql';
import { logger } from '../utils/logger';

export const breedResolver: Resolvers = {
  Breed: {
    pets: ( parent, _, ctx ) => {
      return ctx.prisma.pet.findMany( { where: { breedId: parent.id } } )
        .then( pets => {
          logger.info( `Successfully fetched pets of breed id-${parent.id} name-${parent.name}` );
          return pets;
        } );
    }
  }
};