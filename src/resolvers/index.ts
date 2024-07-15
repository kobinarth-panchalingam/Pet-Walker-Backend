import { Resolvers } from '../generated/graphql';

import { petResolvers } from './petResolver';
import { userResolvers } from './userResolver';

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
  Date: DateResolver,
  DateTime: DateTimeResolver,
  JSON: JSONResolver
};
