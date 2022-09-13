import React from "react";
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
        className="w-full bg-gray-700 flex justify-between rounded-md shadow-md p-1 px-1 md:px-2 items-center
      hover:bg-opacity-70 cursor-pointer transition duration-150 group text-start"
      >
        <h4 className="text-sm">{task.name}</h4>
        <div className="hover:bg-opacity-90 p-1 rounded">
          <PencilAltIcon className="w-4 text-white opacity-0 group-hover:opacity-100 " />
        </div>
      </button>
    </>
  );
}

export default Task;
