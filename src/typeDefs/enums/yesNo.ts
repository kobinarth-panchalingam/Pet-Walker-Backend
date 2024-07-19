import { gql } from 'graphql-tag';

export const yesNo = gql`
  enum YesNo {
    YES
    NO
  }
`;
