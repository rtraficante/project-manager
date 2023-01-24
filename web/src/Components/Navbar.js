import React from "react";
import { useMutation } from "@apollo/client";
import { client } from "../index";
import { LOGOUT } from "../graphql/mutations/user";
import { useNavigate } from "react-router";
import { UserIcon } from "@heroicons/react/outline";

function Navbar() {
  const [logoutUser] = useMutation(LOGOUT);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => client.resetStore());
    navigate("/login");
  };

  return (
    <div className="h-14 flex justify-between bg-black px-2 md:px-8 items-center text-white border-b border-gray-600">
      <div>
        <button className="font-bold p-2 rounded hover:bg-blue-500 hover:bg-opacity-60">
          <a href="/">taskform.</a>
        </button>
      </div>
      <div>
        <div className="flex space-x-4 items-center justify-center">
          <a
            href="/account"
            className="flex space-x-1 items-center hover:bg-blue-500 hover:bg-opacity-60 rounded p-2"
          >
            <UserIcon className="w-5" />
            <p>Account</p>
          </a>
          <button
            className="hover:bg-blue-500 hover:bg-opacity-60 rounded p-2"
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
