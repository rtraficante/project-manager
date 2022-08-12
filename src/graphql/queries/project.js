import { gql } from "@apollo/client";

export const PROJECTS_BY_USER_ID = gql`
  query GetProjectsByUserId($userId: Int!) {
    getProjectsByUserId(userId: $userId) {
      id
      name
    }
  }
`;
