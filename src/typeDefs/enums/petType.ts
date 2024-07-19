import { gql } from 'graphql-tag';

export const petType = gql`
  enum PetType {
    DOG
    CAT
  }
`;
