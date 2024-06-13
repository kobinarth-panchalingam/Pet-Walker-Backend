import { gql } from "graphql-tag";

export const roles = gql`
  enum Role {
    ADMIN
    OWNER
    WALKER
  }
`;
