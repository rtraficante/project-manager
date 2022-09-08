import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        field
        message
      }
      user {
        id
        email
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register(
    $firstName: String
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      errors {
        field
        message
      }
      user {
        id
        email
        username
        firstName
        lastName
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
