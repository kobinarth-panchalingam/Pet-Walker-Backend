import { Resolvers } from '../generated/graphql';

import { dateResolver } from './scalars/dateResolver';
import { petResolvers } from './petResolver';
import { userResolvers } from './userResolver';

export const resolvers: Resolvers = {
  Query: {
    ...userResolvers.Query,
    ...petResolvers.Query
  },
  Mutation: {
    ...petResolvers.Mutation
  },
  User: userResolvers.User,
  Pet: petResolvers.Pet,
  Date: dateResolver
};
