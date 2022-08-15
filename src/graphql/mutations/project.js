import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation ($name: String!, $userId: Int!) {
    createProject(name: $name, userId: $userId) {
      id
      name
    }
  }
`;
