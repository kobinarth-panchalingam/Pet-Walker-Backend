import { gql } from 'graphql-tag';

export const queries = gql`
  type Query {
    getUsers: [User]
    getPets: [Pet]
  }
`;
