import { Resolvers } from "../generated/graphql.js";
import { bookResolver } from "./bookResolver.js";

export const resolvers: Resolvers = {
  Query: {
    books: bookResolver,
  },
};
