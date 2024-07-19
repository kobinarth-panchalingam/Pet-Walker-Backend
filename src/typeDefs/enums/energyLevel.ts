import { gql } from 'graphql-tag';

export const energyLevel = gql`
  enum EnergyLevel {
    LOW
    MEDIUM
    HIGH
  }
`;
