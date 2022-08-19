import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation createTask(
    $name: String!
    $description: String
    $due: Date
    $projectId: Int!
  ) {
    createTask(
      name: $name
      description: $description
      due: $due
      projectId: $projectId
    ) {
      id
      name
      due
      projectId
    }
  }
`;

export const EDIT_TASK_STATUS = gql`
  mutation editTaskStatus($id: Int!, $status: String!) {
    editTaskStatus(id: $id, status: $status)
  }
`;

export const EDIT_TASK = gql`
  mutation editTask(
    $id: Int!
    $name: String
    $description: String
    $due: Date
  ) {
    editTask(id: $id, name: $name, description: $description, due: $due) {
      id
      name
      description
      due
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: Int!) {
    deleteTask(id: $id)
  }
`;
