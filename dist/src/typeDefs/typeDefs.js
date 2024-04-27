import { queries } from "./graphql/queries";
import { book } from "./graphql/types/book";
const types = [book];
export const typeDefs = [types, queries];
