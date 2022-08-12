import React from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";

function ProjectThumbnail({ name }) {
  return (
    <div className="flex items-center justify-center w-[320px] h-[200px] max-w-[400px] border border-gray-600 bg-white drop-shadow-lg rounded-lg">
      <div className="flex space-x-2">
        {name === "Create a new project" ? (
          <PlusCircleIcon className="w-6" />
        ) : null}
        <h2 className="text-center">{name}</h2>
      </div>
    </div>
  );
}

export default ProjectThumbnail;
