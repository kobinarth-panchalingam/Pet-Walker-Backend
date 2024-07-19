import { gql } from 'graphql-tag';

export const breed = gql`
  type Breed {
    id: Int!
    pets: [Pet!]!

    name: String!
    petType: PetType!

    createdAt: DateTime!
    updatedAt: DateTime!
}
`;
