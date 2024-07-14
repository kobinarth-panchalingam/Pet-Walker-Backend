import { gql } from 'graphql-tag';

export const userUpdate = gql`
    input EmergencyContactUpdate {
        name: String!
        phoneNumber: String!
    }
        
    input UserUpdate {
        firstName: String!
        lastName: String
        phoneNumber: String
        dob: Date
        street: String
        city: String
        district: String
        zipCode: String
        profilePhoto: String
        emergencyContacts: [EmergencyContactUpdate!]
    }
`;