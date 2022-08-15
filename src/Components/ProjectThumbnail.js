import React from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";

function ProjectThumbnail({ name, setOpenCreateProject, openCreateProject }) {
  return (
    <button
      onClick={
        openCreateProject !== undefined
          ? () => setOpenCreateProject(!openCreateProject)
          : null
      }
      className="flex items-center justify-center w-[320px] h-[200px] max-w-[400px] border border-gray-600 bg-white drop-shadow-lg rounded-lg active:opacity-70 active:bg-gray-200 hover:scale-105 transition duration-150"
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
