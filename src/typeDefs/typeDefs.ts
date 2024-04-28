import { queries } from "./graphql/queries.js";
import { book } from "./graphql/types/book.js";

const types = [book];
export const typeDefs = [types, queries];
