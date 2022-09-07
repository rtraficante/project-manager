import React from "react";
import { useMutation } from "@apollo/client";
import { client } from "../index";
import { LOGOUT } from "../graphql/mutations/user";
import { useNavigate } from "react-router";

function Navbar() {
  const [logoutUser] = useMutation(LOGOUT);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => client.resetStore());
    navigate("/login");
  };

  return (
    <div className="bg-blue-600 h-14 flex justify-between px-8 items-center text-white">
      <div>
        <button className="font-bold p-2 rounded hover:bg-blue-400">
          <a href="/">Project Management</a>
        </button>
      </div>
      <div>
        <div className="flex space-x-4 items-center">
          <button
            className="hover:bg-blue-400 bg-blue-600 rounded p-2"
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
