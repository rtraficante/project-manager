import { XIcon } from "@heroicons/react/solid";
import React from "react";
import EditTaskStatus from "./EditTaskStatus";

function TaskInformation({ task, setShowTaskInfo, setTaskShown, project }) {
  return (
    <div className="absolute w-full top-0 right-0 bg-gray-600 bg-opacity-60 h-full">
      <div
        className="flex flex-col border m-auto p-4 pb-6 items-start
      w-11/12 md:w bg-white rounded-md mt-24 max-w-[600px] text-gray-800"
      >
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl">{task.name}</h2>
            <XIcon
              className="w-5 cursor-pointer hover:scale-110"
              onClick={() => {
                setShowTaskInfo(false);
                setTaskShown({});
              }}
            />
          </div>
          <div className="flex items-center mt-4">
            <p className="text-sm">
              Status: <strong>{task.status}</strong>
            </p>
            <EditTaskStatus task={task} project={project} />
          </div>

          <p className="text-sm mt-2">
            Due Date: <strong>{new Date(task.due).toDateString()}</strong>
          </p>
        </div>
        <div className="w-full mt-8">
          <h4 className="font-bold text-md">Description</h4>
          <div className="rounded p-4 bg-gray-100 mt-2">
            <p className="text-sm">
              {task.description
                ? task.description
                : "This task does not have a description."}
            </p>
          </div>
        </div>
        <div className="w-full mt-4">
          <button className="p-2 w-full rounded-md text-white bg-blue-600">
            Edit Task Information
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskInformation;
