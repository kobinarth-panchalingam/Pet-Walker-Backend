import { gql } from "graphql-tag";

export const pet = gql`
  type Pet {
    id: ID!
    name: String!
    breed: String!
    dob: String
    description: String
    ownerId: Int!
    owner: User!
    createdAt: String!
    updatedAt: String!
  }
`;
