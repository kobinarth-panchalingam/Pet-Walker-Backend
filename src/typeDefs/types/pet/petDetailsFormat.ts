import { gql } from 'graphql-tag';

export const petDetailsFormat = gql`
    union PetDetailsValue = String | Int

    type PetDetailsFormat {
        value: PetDetailsValue
        additionalDetails: String
    }
`;
