import { gql } from "@apollo/client";

export const CREATE_INVITE = gql`
  mutation createInvite($projectId: Int!, $senderId: Int!, $inviteeId: Int!) {
    createInvite(
      projectId: $projectId
      senderId: $senderId
      inviteeId: $inviteeId
    ) {
      errors {
        message
      }
      status
    }
  }
`;

export const ACCEPT_INVITE = gql`
  mutation ($inviteId: Int!) {
    acceptInvite(inviteId: $inviteId)
  }
`;
