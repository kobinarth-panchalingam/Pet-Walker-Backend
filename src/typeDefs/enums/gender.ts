import { gql } from 'graphql-tag';

export const gender = gql`
  enum Gender {
    MALE
    FEMALE
  }
`;
