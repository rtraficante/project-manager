import React, { useState } from "react";
import { PencilAltIcon } from "@heroicons/react/outline";

function Task({ task, setShowTaskInfo, setTaskShown }) {
  const handleClick = () => {
    setShowTaskInfo(true);
    setTaskShown(task);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full bg-white flex justify-between rounded-md shadow-md p-1 px-2 items-center
      hover:bg-gray-100 cursor-pointer transition duration-150 group"
      >
        <h4 className="text-sm">{task.name}</h4>
        <div className="hover:bg-gray-200 p-1 rounded">
          <PencilAltIcon className="w-4 text-gray-600 opacity-0 group-hover:opacity-100 " />
        </div>
      </button>
    </>
  );
}

export default Task;
