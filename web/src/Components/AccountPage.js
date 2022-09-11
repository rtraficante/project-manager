import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const AccountPage = ({ user, userLoading }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.me && !userLoading) {
      navigate("/login");
    }
  }, [navigate, user?.me, userLoading]);

  return (
    <div>
      <div className="max-w-[680px] space-y-4 mt-8 mx-auto">
        <h2 className="text-white font-bold text-2xl">
          {user?.me.username}'s Account
        </h2>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">User Information</h2>
          <div>
            <p>
              <strong>First Name:</strong> {user?.me.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user?.me.lastName}
            </p>
            <p>
              <strong>Username:</strong> {user?.me.username}
            </p>
            <p>
              <strong>Email:</strong> {user?.me.email}
            </p>
          </div>
          <button className="mt-4 p-2 bg-blue-800 rounded drop-shadow-xl text-white px-4 hover:bg-blue-600">
            Edit Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
