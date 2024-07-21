import { Resolvers } from '../../schema/graphql-types';
import { validateNonNullableFields } from '../../utils/helpers';
import { logger } from '../../utils/logger';

export const petResolvers: Resolvers = {
  Pet: {
    user: ( parent, _, ctx ) => {
      return ctx.prisma.user.findUnique( { where: { id: parent.userId } } )
        .then( user => {
          logger.info( `Successfully fetched owner of pet id-${parent.id} name-${parent.name}` );
          return user;
        } );
    },
    breed: ( parent, _, ctx ) => {
      return ctx.prisma.breed.findUnique( { where: { id: parent.breedId } } )
        .then( breed => {
          logger.info( `Successfully fetched breed of pet id-${parent.id} name-${parent.name}` );
          return breed;
        }
        );
    },
    petDetails: ( parent, _, ctx ) => {
      return ctx.prisma.petDetails.findUnique( { where: { petId: parent.id } } )
        .then( petDetails => {
          logger.info( `Successfully fetched details of pet id-${parent.id} name-${parent.name}` );
          return petDetails;
        }
        );
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
    addPet: async( _, args, ctx ) => {
      const { breedId, petType, name, dob, photo, gender, weight, petDetails } = args.input;

      // Add pet to the database
      const addedPet = await ctx.prisma.pet.create( { data: { userId: ctx.user.id, breedId, petType, name, dob, photo, gender, weight } } )
        .then( pet => {
          logger.info( `Successfully added pet id-${pet.id} name-${pet.name}` );
          return pet;
        } );

      // Add pet details to the database
      // TODO: Restrict enum values for petDetails. For now controlling it from user input
      const addedPetDetails = await ctx.prisma.petDetails.create( { data: { petId: addedPet.id, ...petDetails } } )
        .then( petDetails => {
          logger.info( `Successfully added details of pet id-${addedPet.id} name-${addedPet.name}` );
          return petDetails;
        } );

      return {
        code: '200',
        success: true,
        message: 'Pet added successfully',
        data: { ...addedPet, petDetails: addedPetDetails }
      };
    },
    updatePet: async( _, args, ctx ) => {
      const { id, breedId, petType, name, dob, photo, gender, weight, petDetails } = args.input;
      validateNonNullableFields( { breedId, petType, gender, weight, dob } );
      return null;
    }
  }
};
