import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { client } from "../index";
import { ME } from "../graphql/queries/user";
import { LOGOUT } from "../graphql/mutations/user";
import { useNavigate } from "react-router";

function Navbar() {
  const { data } = useQuery(ME);
  const [logoutUser] = useMutation(LOGOUT);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => client.resetStore());
    navigate("/login");
  };

  return (
    <div className="bg-blue-600 h-14 flex justify-between px-8 items-center text-white">
      <div>
        <a className="font-bold hover:opacity-80" href="/">
          Project Management
        </a>
      </div>
      <div>
        <div className="flex space-x-4 items-center">
          <p className="font-bold">{data?.me.email}</p>
          <button
            className="hover:bg-blue-400 rounded-lg p-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
