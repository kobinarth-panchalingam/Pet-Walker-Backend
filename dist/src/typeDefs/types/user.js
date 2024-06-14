import { gql } from "graphql-tag";
export const user = gql `
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String
    address: String
    status: Status!
    role: Role!
    createdAt: String!
    pets: [Pet!]!
  }
`;
