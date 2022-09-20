import { gql } from "@apollo/client";

export const GET_INVITES = gql`
  query getInvites {
    getInvites {
      id
      sender {
        id
        firstName
        lastName
      }
      invitee {
        id
      }
      project {
        name
      }
    }
  }
`;
