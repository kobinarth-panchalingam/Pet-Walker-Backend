import { Resolvers } from '../generated/graphql';

import { breedResolver } from './types/breedResolver';
import { petDetailsResolver } from './types/petDetailsResolver';
import { petResolvers } from './types/petResolver';
import { userResolvers } from './types/userResolver';

import { DateResolver, DateTimeResolver, JSONResolver } from 'graphql-scalars';

export const resolvers: Resolvers = {
  Query: {
    ...userResolvers.Query,
    ...petResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...petResolvers.Mutation
  },
  User: userResolvers.User,
  Pet: petResolvers.Pet,
  PetDetails: petDetailsResolver.PetDetails,
  Breed: breedResolver.Breed,
  Date: DateResolver,
  DateTime: DateTimeResolver,
  JSON: JSONResolver
};
