import { gql } from 'graphql-tag';

export const mutationResponse = gql`
  type MutationResponse {
    code: String!
    success: Boolean!
    message: String
    data: JSON
  }
`;