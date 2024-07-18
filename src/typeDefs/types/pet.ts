import { gql } from 'graphql-tag';

export const pet = gql`
  type Pet {
    id: Int!
    name: String!
    breed: String!
    dob: Date
    description: String
    userId: Int!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`;
