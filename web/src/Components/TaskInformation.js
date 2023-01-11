import { useMutation } from "@apollo/client";
import { XIcon } from "@heroicons/react/solid";
import React from "react";
import { DELETE_TASK } from "../graphql/mutations/task";
import { GET_PROJECT } from "../graphql/queries/project";
import EditTaskStatus from "./EditTaskStatus";

function TaskInformation({
  task,
  setShowTaskInfo,
  setTaskShown,
  project,
  setShowTaskEdit,
}) {
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_PROJECT,
        variables: {
          projectId: project?.getProject.project.id,
        },
      },
      "getProject",
    ],
  });

  const handleDelete = () => {
    deleteTask({
      variables: {
        id: task.id,
      },
    });
    setShowTaskInfo(false);
  };

  return (
    <div className="absolute w-full top-0 right-0 bg-gray-600 bg-opacity-60 h-full">
      <div
        className="flex flex-col shadow m-auto p-4 pb-6 items-start
      w-11/12 md:w bg-gray-800 text-white rounded-md mt-24 max-w-[600px]"
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
          <div className="flex space-x-2 items-center mt-4">
            <p className="text-sm">Status:</p>
            <EditTaskStatus
              task={task}
              project={project}
              setShowTaskInfo={setShowTaskInfo}
            />
          </div>

          <p className="text-sm mt-2">
            Due Date:{" "}
            <strong>
              {task.due ? new Date(task.due).toDateString() : "Not Set"}
            </strong>
          </p>
        </div>
        <div className="w-full mt-8">
          <h4 className="font-bold text-md">Description</h4>
          <div className="rounded p-4 bg-gray-700 mt-2">
            <p className="text-sm">
              {task.description
                ? task.description
                : "This task does not have a description."}
            </p>
          </div>
        </div>
        <div className="w-full text-sm md:text-md md:w-3/4 mx-auto flex gap-4 mt-4 md:mt-8">
          <button
            onClick={() => {
              setShowTaskEdit(true);
              setShowTaskInfo(false);
            }}
            className="p-2 w-full rounded-md text-white bg-blue-800 hover:bg-blue-600"
          >
            Edit Task Information
          </button>
          <button
            onClick={handleDelete}
            className="p-2 w-full rounded-md text-white bg-red-700 hover:bg-red-600"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskInformation;
