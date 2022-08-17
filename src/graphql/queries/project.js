import { gql } from "@apollo/client";

export const PROJECTS_BY_USER_ID = gql`
  query GetProjectsByUserId {
    getProjectsByUserId {
      id
      name
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($projectId: Int!) {
    getProject(projectId: $projectId) {
      id
      name
      userId
      tasks {
        id
        name
        description
        due
        status
      }
    }
  }
`;
