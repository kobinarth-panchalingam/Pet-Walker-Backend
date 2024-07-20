import { gql } from 'graphql-tag';

export const pet = gql`
  type Pet {
    id: Int!
    userId: Int!
    user: User!
    breedId: Int!
    breed: Breed!
    petDetails: PetDetails
    
    petType: PetType!
    name: String!
    dob: Date
    photo: String
    gender: Gender!
    weight: Float!

    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
