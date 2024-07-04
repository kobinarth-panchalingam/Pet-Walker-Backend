import { gql } from 'graphql-tag';

export const mutations = gql`
  type Mutation {
    addPet(input: PetAdd!): Pet
  }
`;
