import { useMutation } from "@apollo/client";
import React from "react";
import { ACCEPT_INVITE } from "../graphql/mutations/invitations";
import { GET_INVITES } from "../graphql/queries/invitations";
import { PROJECTS_BY_USER_ID } from "../graphql/queries/project";

const Invites = ({ invite }) => {
  const [acceptInvite] = useMutation(ACCEPT_INVITE, {
    refetchQueries: [
      { query: PROJECTS_BY_USER_ID },
      "GetProjectsByUserId",
      { query: GET_INVITES },
      "getInvites",
    ],
  });

  const handleAccept = async () => {
    await acceptInvite({
      variables: {
        inviteId: invite.id,
      },
    });
  };

  return (
    <div className="w-full flex justify-between bg-gray-900 p-4 py-2.5 rounded  items-center shadow-md">
      <p>
        {invite.sender.firstName} {invite.sender.lastName} has invited you to
        work on {invite.project.name}.
      </p>
      <div className="space-x-2">
        <button
          className="p-2 bg-blue-800 hover:bg-blue-600 text-white text-sm rounded-md shadow-lg"
          onClick={handleAccept}
        >
          Accept
        </button>
        <button className="p-2 bg-red-700 hover:bg-red-600 text-white text-sm rounded-md shadow-lg">
          Decline
        </button>
      </div>
    </div>
  );
};

export default Invites;
