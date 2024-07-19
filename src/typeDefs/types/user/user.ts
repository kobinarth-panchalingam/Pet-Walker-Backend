import { gql } from 'graphql-tag';

export const user = gql`
  type User {
    id: Int!
    
    email: String!
    firstName: String!
    lastName: String
    phoneNumber: String
    dob: Date
    street: String
    city: String
    district: String
    zipCode: String
    profilePhoto: String
    emergencyContacts: [EmergencyContact!]
    status: Status!
    role: Role!
    pets: [Pet!]!

    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
