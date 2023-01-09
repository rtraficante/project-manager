import { useLazyQuery, useMutation } from "@apollo/client";
import { XIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { CREATE_INVITE } from "../graphql/mutations/invitations";
import { GET_USER_BY_EMAIL } from "../graphql/queries/user";

const InviteForm = ({ setShowInviteForm, projectId, userId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [getUser, { loading, error, data: user }] =
    useLazyQuery(GET_USER_BY_EMAIL);

  const [inviteUser, {}] = useMutation(CREATE_INVITE);
  console.log(userId, user, projectId);

  return (
    <div className="absolute w-full top-0 right-0 bg-gray-600 bg-opacity-60 h-full">
      <div className="flex flex-col shadow m-auto p-4 pb-6 items-center w-[95%] md:w-3/4 bg-gray-800 text-white rounded-md mt-24 max-w-[600px]">
        <div className="relative w-full">
          <XIcon
            onClick={() => {
              console.log("clicked");
              setShowInviteForm(false);
            }}
            className="absolute w-5 top-0 right-0 cursor-pointer hover:scale-110"
          />
          <h2 className="text-center">Invite User</h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getUser({ variables: { email: searchTerm } });
          }}
          className="flex flex-col md:flex-row w-full md:space-x-2"
        >
          <input
            name="email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by email"
            className="flex-1 md:w-3/4 py-2 px-4 border bg-gray-700 rounded-md border-gray-400 mt-4"
          />
          <button className="drop-shadow-md rounded-md p-2  bg-blue-800 hover:bg-blue-600 text-white mt-4">
            Search
          </button>
        </form>
        <div className="mt-8 w-full">
          <div className="bg-gray-700 w-full p-4 rounded-md">
            {!loading && user?.getUser ? (
              <div className="flex items-center">
                <p className="flex-1">{user.getUser.email}</p>
                <button
                  className="drop-shadow-md rounded-md p-2  bg-blue-800 hover:bg-blue-600 text-white"
                  onClick={() => {
                    inviteUser({
                      variables: {
                        projectId: Number(projectId),
                        senderId: userId,
                        inviteeId: user.getUser.id,
                      },
                    });
                  }}
                >
                  Invite User
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteForm;
