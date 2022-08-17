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

