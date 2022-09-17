import React from "react";
import Task from "./Task";

function ProjectStatusContainer({
  project,
  status,
  setShowTaskInfo,
  setTaskShown,
}) {
  const tasks = project.getProject.tasks
    .filter((task) => task.status === status)
    .sort((a, b) => Number(a.createdAt) - Number(b.createdAt));

  return (
    <div className="bg-gray-800 text-white shadow-md p-2 h-fit max-h-[85vh] w-[280px] rounded">
      <h4 className="text-center font-bold">{status}</h4>
      <div className="space-y-2 rounded-md mt-2 overflow-y-auto max-h-[55vh]">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task
              key={task.id}
              setTaskShown={setTaskShown}
              setShowTaskInfo={setShowTaskInfo}
              task={task}
            />
          ))
        ) : (
          <p className="text-sm text-center">No tasks in this section</p>
        )}
      </div>
    </div>
  );
}

export default ProjectStatusContainer;
