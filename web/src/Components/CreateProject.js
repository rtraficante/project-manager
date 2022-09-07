import { useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { CREATE_PROJECT } from "../graphql/mutations/project";

import { XIcon } from "@heroicons/react/solid";

import { PROJECTS_BY_USER_ID } from "../graphql/queries/project";

function CreateProject({ user, openCreateProject, setOpenCreateProject }) {
  const nameRef = useRef();

  const [newProject] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: PROJECTS_BY_USER_ID }, "GetProjectsByUserId"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    newProject({
      variables: {
        name: nameRef.current.value,
        userId: user?.me.id,
      },
    });
    setOpenCreateProject(false);
  };

  return (
    <div className="fixed flex justify-center w-screen h-screen z-50 bg-gray-600 bg-opacity-60">
      <div className="border mt-28 w-[95%] md:w-3/4 max-w-[500px] p-2 max-h-[170px] md:max-h-[120px] bg-white rounded-md drop-shadow">
        <div className="flex mt-1 my-4 items-center">
          <h2 className="justify-self-center flex-1 text-center text-lg">
            Create A New Project
          </h2>
          <XIcon
            className="w-5 justify-self-end cursor-pointer hover:scale-110"
            onClick={() => setOpenCreateProject(false)}
          />
        </div>
        <form
          className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 justify-center px-2"
          onSubmit={handleSubmit}
        >
          <input
            ref={nameRef}
            className="border p-2 rounded-md flex-1"
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
