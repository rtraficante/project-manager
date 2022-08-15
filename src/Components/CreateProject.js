import { useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { CREATE_PROJECT } from "../graphql/mutations/project";
import { client } from "../index";
import { XIcon } from "@heroicons/react/solid";

function CreateProject({ user, openCreateProject, setOpenCreateProject }) {
  const nameRef = useRef();
  const navigate = useNavigate();

  const [newProject, { data, loading: projectLoading, error }] =
    useMutation(CREATE_PROJECT);

  const handleSubmit = (e) => {
    e.preventDefault();
    newProject({
      variables: {
        name: nameRef.current.value,
        userId: user?.me.id,
      },
    });
    // .then(() => client.resetStore());
    navigate("/");
  };

  return (
    <div className="absolute flex justify-center w-screen h-screen z-50 bg-gray-600 bg-opacity-60">
      <div className="border mt-28 w-3/4 h-[90px] bg-white rounded-md drop-shadow">
        <div>
          <XIcon
            className="w-5 right-0 top-0 m-2 absolute cursor-pointer hover:scale-110"
            onClick={() => setOpenCreateProject(!openCreateProject)}
          />
        </div>
        <form
          className="p-6  flex space-x-4 justify-center"
          onSubmit={handleSubmit}
        >
          <input
            ref={nameRef}
            className="border p-2 rounded-md"
            placeholder="Project name..."
          />
          <button className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-700 active-bg-blue-800">
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
