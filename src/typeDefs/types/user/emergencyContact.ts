import { gql } from 'graphql-tag';

export const emergencyContact = gql`
  type EmergencyContact {
    id: Int!
    userId: Int!
    user: User!
    
    name: String!
    phoneNumber: String!

    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
