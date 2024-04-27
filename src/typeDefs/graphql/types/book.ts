import { gql } from "graphql-tag";

export const book = gql`
  type Book {
    title: String
    author: String
  }
`;
