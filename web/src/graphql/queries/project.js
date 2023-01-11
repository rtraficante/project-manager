import { gql } from "@apollo/client";

export const PROJECTS_BY_USER_ID = gql`
  query GetProjectsByUserId {
    getProjectsByUserId {
      id
      project {
        id
        name
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($projectId: Int!) {
    getProject(projectId: $projectId) {
      errors {
        type
        message
      }
      project {
        id
        name
        tasks {
          id
          name
          description
          due
          status
          createdAt
        }
        users {
          id
          username
          email
          firstName
          lastName
        }
      }
    }
  }
`;
