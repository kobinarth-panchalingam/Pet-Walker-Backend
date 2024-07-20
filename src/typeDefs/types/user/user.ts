import { gql } from 'graphql-tag';

export const user = gql`
  type User {
    id: Int!
    emergencyContacts: [EmergencyContact!]
    pets: [Pet!]!
    
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
    status: Status!
    role: Role!

    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
