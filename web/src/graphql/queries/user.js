import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
      email
      username
      firstName
      lastName
    }
  }
`;

export const ALL_USERS = gql`
  query allUsers {
    allUsers {
      firstName
      lastName
      email
    }
  }
`;
