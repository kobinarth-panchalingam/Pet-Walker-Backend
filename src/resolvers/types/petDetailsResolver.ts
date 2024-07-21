import { Resolvers } from '../../schema/graphql-types';
import { logger } from '../../utils/logger';

export const petDetailsResolver: Resolvers = {
  PetDetails: {
    pet: ( parent, _, ctx ) => {
      return ctx.prisma.pet.findUnique( { where: { id: parent.petId } } )
        .then( pet => {
          logger.info( `Successfully fetched pet id-${parent.petId}` );
          return pet;
        } );
    }
  }
};