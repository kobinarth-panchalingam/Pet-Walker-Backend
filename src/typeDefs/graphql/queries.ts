import { gql } from "graphql-tag";

export const queries = gql`
  type Query {
    books: [Book]
  }
`;
