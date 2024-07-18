import { gql } from 'graphql-tag';

export const user = gql`
  type EmergencyContact {
    id: Int!
    name: String!
    phoneNumber: String!
    userId: Int!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

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
    createdAt: DateTime!
    updatedAt: DateTime!
    pets: [Pet!]!
  }
`;
