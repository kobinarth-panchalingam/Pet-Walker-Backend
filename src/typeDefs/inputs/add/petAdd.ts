import { gql } from 'graphql-tag';

export const petAdd = gql`
  input PetAdd {
    name: String!
    breed: String!
    dob: Date!
    description: String
  }
`;
