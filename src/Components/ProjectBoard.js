import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_PROJECT } from "../graphql/queries/project";
import CreateTask from "./CreateTask";
import ProjectStatusContainer from "./ProjectStatusContainer";
import TaskInformation from "./TaskInformation";

function ProjectBoard({ user }) {
  const params = useParams();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTaskInfo, setShowTaskInfo] = useState(false);
  const [taskShown, setTaskShown] = useState({});

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
    <>
      <div className="m-2 my-4">
        <button
          className="p-2 bg-blue-600 text-white rounded-md"
          onClick={() => setShowCreateForm(true)}
        >
          + Add new task
        </button>
      </div>
      <div className="flex h-screen mt-4 mx-2 space-x-2 justify-center overflow-x-scroll">
        {/* Tasks that have not been started */}
        <ProjectStatusContainer
          project={project}
          setTaskShown={setTaskShown}
          setShowTaskInfo={setShowTaskInfo}
          status={"Not Started"}
        />

        {/* Tasks that are in progress */}
        <ProjectStatusContainer
          project={project}
          setShowTaskInfo={setShowTaskInfo}
          setTaskShown={setTaskShown}
          status={"In Progress"}
        />

        {/* Tasks that have been completed */}
        <ProjectStatusContainer
          project={project}
          setShowTaskInfo={setShowTaskInfo}
          setTaskShown={setTaskShown}
          status={"Completed"}
        />

        {showCreateForm && (
          <CreateTask project={project} setShowForm={setShowCreateForm} />
        )}

        {showTaskInfo && (
          <TaskInformation
            task={taskShown}
            setTaskShown={setTaskShown}
            setShowTaskInfo={setShowTaskInfo}
          />
        )}
      </div>
    </>
  );
}

export default ProjectBoard;
