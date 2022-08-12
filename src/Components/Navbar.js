import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { client } from "../index";
import { ME } from "../graphql/queries/user";
import { LOGOUT } from "../graphql/mutations/user";

function Navbar() {
  const { loading, data } = useQuery(ME);
  const [logoutUser] = useMutation(LOGOUT);

  const handleLogout = () => {
    logoutUser().then(() => client.resetStore());
  };

  return (
    <div className="bg-blue-600 h-14 flex justify-between px-8 items-center text-white">
      <div>
        <a className="font-bold" href="/">
          Bug Tracker
        </a>
      </div>
      <div>
        {data?.me ? (
          <div className="flex space-x-4 items-center">
            <p className="font-bold">{data?.me.email}</p>
            <button
              className="hover:bg-blue-400 rounded-lg p-2"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <button className="hover:bg-blue-400 rounded-lg p-2">
            <a href="/login">Login</a>
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
