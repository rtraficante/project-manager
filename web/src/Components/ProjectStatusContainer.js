import React from "react";
import Task from "./Task";

function ProjectStatusContainer({
  project,
  status,
  setShowTaskInfo,
  setTaskShown,
}) {
  return (
    <div className="bg-gray-200 shadow-md p-2 h-fit max-h-[85vh] w-[280px]">
      <h4 className="text-center font-bold">{status}</h4>
      <div className="space-y-2 rounded-md mt-2 overflow-y-auto max-h-[55vh]">
        {project.getProject.tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <Task
              key={task.id}
              setTaskShown={setTaskShown}
              setShowTaskInfo={setShowTaskInfo}
              task={task}
            />
          ))}
      </div>
    </div>
  );
}

export default ProjectStatusContainer;
