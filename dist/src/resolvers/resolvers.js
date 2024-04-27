import { bookResolver } from "./bookResolver";
export const resolvers = {
  Query: {
    books: bookResolver,
  },
};
