import { gql } from 'graphql-tag';

export const upperCase = gql`
    directive @uppercase on FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION | ENUM_VALUE
`;
