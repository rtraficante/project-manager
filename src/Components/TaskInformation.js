import { XIcon } from "@heroicons/react/solid";
import React from "react";

function TaskInformation({ task, setShowTaskInfo, setTaskShown }) {
  return (
    <div className="absolute w-full top-0 right-0 bg-gray-600 bg-opacity-60 h-full">
      <div className="flex flex-col border m-auto p-4 pb-6 items-start w-3/4 bg-white rounded-md mt-24 max-w-[600px] text-gray-800 space-y-8">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">{task.name}</h2>
            <XIcon
              className="w-5 cursor-pointer hover:scale-110"
              onClick={() => {
                setShowTaskInfo(false);
                setTaskShown({});
              }}
            />
          </div>
          <p className="text-sm">
            Status: <strong>{task.status}</strong>
          </p>
        </div>
        <div className="w-full">
          <h4 className="font-bold text-md">Description</h4>
          <div className="rounded p-4 bg-gray-100 mt-2">
            <p className="text-sm">
              {task.description
                ? task.description
                : "This task does not have a description."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskInformation;
