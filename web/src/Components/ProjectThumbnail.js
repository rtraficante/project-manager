import React from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router";

function ProjectThumbnail({
  name,
  setOpenCreateProject,
  openCreateProject,
  id,
}) {
  const navigate = useNavigate();
  return (
    <button
      onClick={
        openCreateProject !== undefined
          ? () => setOpenCreateProject(true)
          : () => navigate(`/projects/${id}`)
      }
      className="flex items-center justify-center w-[320px] h-[200px] max-w-[400px] border border-gray-800 bg-gray-800 text-white shadow-md rounded-lg active:bg-opacity-60 hover:bg-opacity-70 transition duration-150"
    >
      <div className="flex space-x-2">
        {name === "Create a new project" ? (
          <PlusCircleIcon className="w-6" />
        ) : null}
        <h2 className="text-center">{name}</h2>
      </div>
    </button>
  );
}

export default ProjectThumbnail;
