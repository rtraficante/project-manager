import { useMutation } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router";
import { DELETE_PROJECT } from "../graphql/mutations/project";
import { PROJECTS_BY_USER_ID } from "../graphql/queries/project";

function DeleteProjectConfirm({ project, setShowDeleteConfirm }) {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: PROJECTS_BY_USER_ID }, "GetProjectsByUserId"],
  });
  const navigate = useNavigate();

  const handleDelete = async () => {
    const projectToDelete = await deleteProject({
      variables: {
        id: project?.getProject.project.id,
      },
    });
    if (projectToDelete) {
      navigate("/");
    }
  };

  return (
    <div className="fixed w-full top-0 right-0 bg-gray-600 bg-opacity-60 h-full">
      <div className="flex flex-col shadow m-auto p-4 pb-6 items-center w-[95%] bg-gray-800 text-white rounded-md mt-24 max-w-[540px]">
        <div className="flex flex-col sm:flex-row space-x-1">
          <h2 className="text-center text-xl text-red-700 font-bold">
            WARNING:
          </h2>
          <h2 className="text-center text-lg font-bold">
            You are about to delete this project.
          </h2>
        </div>
        <h4 className="text-center text-xl mt-8">
          Are you sure you want to delete this project?
        </h4>
        <div className="mt-4 flex flex-col sm:flex-row w-full sm:w-3/4 sm:mx-auto sm:justify-between space-y-2 sm:space-y-0 sm:items-center ">
          <button
            onClick={handleDelete}
            className="p-2 bg-blue-800 hover:bg-blue-600 rounded text-white sm:w-[180px]"
          >
            Yes
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="p-2 bg-red-700 hover:bg-red-600 rounded text-white sm:w-[180px]"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProjectConfirm;
