import { gql } from 'graphql-tag';

export const emergencyContact = gql`
  type EmergencyContact {
    name: String!
    phoneNumber: String!
  }
`;
