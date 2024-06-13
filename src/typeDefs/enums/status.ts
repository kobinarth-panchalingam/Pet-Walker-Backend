import { gql } from "graphql-tag";

export const status = gql`
  enum Status {
    PENDING
    APPROVED
    REJECTED
  }
`;
