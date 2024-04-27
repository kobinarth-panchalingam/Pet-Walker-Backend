import { Resolvers } from "../generated/graphql";
import { bookResolver } from "./bookResolver";

export const resolvers: Resolvers = {
  Query: {
    books: bookResolver,
  },
};
