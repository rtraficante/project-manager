import React from "react";

const Invites = ({ invite }) => {
  return (
    <>
      <p>
        {invite.sender.firstName} {invite.sender.lastName} has invited you to
        work on {invite.project.name}.
      </p>
      <div className="space-x-2">
        <button className="p-2 bg-blue-800 hover:bg-blue-600 text-white text-sm rounded-md shadow-lg">
          Accept
        </button>
        <button className="p-2 bg-red-700 hover:bg-red-600 text-white text-sm rounded-md shadow-lg">
          Decline
        </button>
      </div>
    </>
  );
};

export default Invites;
