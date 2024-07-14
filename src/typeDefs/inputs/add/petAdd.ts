import { gql } from 'graphql-tag';

export const petAdd = gql`
  input PetAdd {
    name: String!
    breed: String!
    userId: Int!
    description: String
  }
`;
