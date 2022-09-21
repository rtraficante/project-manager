import { useQuery } from "@apollo/client";
import { XIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { ALL_USERS } from "../graphql/queries/user";

const InviteForm = ({ setShowInviteForm }) => {
  const { loading, data } = useQuery(ALL_USERS);
  const [searchTerm, setSearchTerm] = useState("");

  const dynamicSearch = () => {
    return data?.allUsers.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="absolute w-full top-0 right-0 bg-gray-600 bg-opacity-60 h-full">
      <form
        // onSubmit={handleSubmit}
        className="flex flex-col shadow m-auto p-4 pb-6 items-center w-[95%] md:w-3/4 bg-gray-800 text-white rounded-md mt-24 max-w-[600px]"
      >
        <XIcon
          onClick={() => setShowInviteForm(false)}
          className="w-5 self-end cursor-pointer hover:scale-110"
        />
        <h2>Invite User</h2>

        <input
          name="email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by email"
          className="w-full md:w-3/4 py-2 px-4 border bg-gray-700 rounded-md border-gray-400 mt-4"
        />
        {!loading ? (
          <div>
            {dynamicSearch().map((user) => (
              <p key={user.email}>{user.email}</p>
            ))}
          </div>
        ) : null}
        <button className="drop-shadow-md rounded-md p-2 w-full md:w-3/4 bg-blue-800 hover:bg-blue-600 text-white mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InviteForm;
