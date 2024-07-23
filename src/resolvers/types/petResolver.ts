import { Resolvers } from '../../schema/graphql-types';
import { getDateOfBirth, validateNonNullableFields } from '../../utils/helpers';
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
      const { breedId, petType, name, ageYears, ageMonths, photo, gender, weight, petDetails } = args.input;
      const dob = getDateOfBirth( ageYears, ageMonths );
      // Add pet to the database
      const addedPet = await ctx.prisma.pet.create( { data: { userId: ctx.user.id, breedId, petType, name, dob, photo, gender, weight } } )
        .then( pet => {
          logger.info( `Successfully added pet id-${pet.id} name-${pet.name}` );
          return pet;
        } );

      // TODO: Restrict enum values for petDetails. For now controlling it from user input
      // Add pet details to the database
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
      const { id, breedId, petType, name, ageYears, ageMonths, photo, gender, weight, petDetails } = args.input;
      const dob = getDateOfBirth( ageYears, ageMonths );
      validateNonNullableFields( { breedId, petType, gender, weight, dob } );
      const updatedPet = await ctx.prisma.pet.update( { where: { id }, data: { breedId, petType, name, dob, photo, gender, weight } } );
      const updatedPetDetails = await ctx.prisma.petDetails.update( { where: { petId: id }, data: petDetails } );
      return {
        code: '200',
        success: true,
        message: 'Pet updated successfully',
        data: { ...updatedPet, petDetails: updatedPetDetails }
      };
    }
  }
};
