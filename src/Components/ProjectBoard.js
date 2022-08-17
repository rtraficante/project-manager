import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_PROJECT } from "../graphql/queries/project";
import CreateTask from "./CreateTask";
import Task from "./Task";

function ProjectBoard({ user }) {
  const params = useParams();

  const { loading, data: project } = useQuery(GET_PROJECT, {
    variables: {
      projectId: Number(params.projectId),
    },
  });

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="text-center text-xl font-bold">Loading...</h2>
      </div>
    );
  }

  if (project?.getProject.userId !== user?.me.id) {
    return (
      <div className="mt-8">
        <h2 className="text-center">You do not have access to this project.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen mt-4 mx-2 space-y-2">
      {/* Tasks that have not been started */}
      <div className="bg-gray-200 shadow-md p-4 flex-1 max-h-[60%]">
        <h4 className="text-center font-bold mb-2">Not Started</h4>
        <div className="space-y-2 rounded-md overflow-y-auto h-[90%] py-4">
          {project?.getProject.tasks
            .filter((task) => task.status === "Not Started")
            .map((task) => (
              <Task key={task.id} task={task} />
            ))}
        </div>
      </div>

      {/* Tasks that are in progress */}
      <div className="bg-gray-200 shadow-md p-4 max-h-[60%]">
        <h4 className="text-center font-bold mb-2">In Progress</h4>
        <div className="space-y-2 rounded-md overflow-y-auto h-[90%] py-4">
          {project?.getProject.tasks
            .filter((task) => task.status === "In Progress")
            .map((task) => (
              <Task key={task.id} task={task} />
            ))}
        </div>
      </div>

      {/* Tasks that have been completed */}
      <div className="bg-gray-200 shadow-md p-4 max-h-[60%]">
        <h4 className="text-center font-bold mb-2">Completed</h4>
        <div className="space-y-2 rounded-md overflow-y-auto h-[90%] py-4">
          {project?.getProject.tasks
            .filter((task) => task.status === "Completed")
            .map((task) => (
              <Task key={task.id} task={task} />
            ))}
        </div>
      </div>

      {/* <CreateTask project={project} /> */}
    </div>
  );
}

export default ProjectBoard;
