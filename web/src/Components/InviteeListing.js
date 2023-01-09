import React from "react";

const InviteeListing = ({
  user,
  projectId,
  userId,

  inviteUser,
}) => {
  return (
    <div className="bg-gray-700 w-full p-4 rounded-md">
      <div className="flex items-center">
        <p className="flex-1">{user.email}</p>
        <button
          className="drop-shadow-md rounded-md p-2  bg-blue-800 hover:bg-blue-600 text-white"
          onClick={() => {
            inviteUser({
              variables: {
                projectId: Number(projectId),
                senderId: userId,
                inviteeId: user.id,
              },
            });
          }}
        >
          Invite User
        </button>
      </div>
    </div>
  );
};

export default InviteeListing;
