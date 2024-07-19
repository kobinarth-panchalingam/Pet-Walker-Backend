import { gql } from 'graphql-tag';

export const walkingSchedule = gql`
  enum WalkingSchedule {
    MORNING
    AFTERNOON
    EVENING
    NIGHT
  }
`;
