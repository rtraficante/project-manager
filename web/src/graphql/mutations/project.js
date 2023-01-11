import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation ($name: String!) {
    createProject(name: $name) {
      id
      name
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: Int!) {
    deleteProject(id: $id)
  }
`;
