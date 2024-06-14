import { userResolvers } from "./userResolver.js";
import { petResolvers } from "./petResolver.js";
import { dateResolver } from "./scalars/dateResolver.js";
export const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...petResolvers.Query,
    },
    Mutation: {
        ...petResolvers.Mutation,
    },
    User: userResolvers.User,
    Pet: petResolvers.Pet,
    Date: dateResolver,
};
