import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PROJECT } from "../graphql/queries/project";
import CreateTask from "./CreateTask";
import DeleteProjectConfirm from "./DeleteProjectConfirm";
import EditTask from "./EditTask";
import ProjectStatusContainer from "./ProjectStatusContainer";
import TaskInformation from "./TaskInformation";
import { PlusCircleIcon, TrashIcon, UserAddIcon } from "@heroicons/react/solid";
import InviteForm from "./InviteForm";

function ProjectBoard({ user, userLoading }) {
  const navigate = useNavigate();
  const params = useParams();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTaskInfo, setShowTaskInfo] = useState(false);
  const [taskShown, setTaskShown] = useState({});
  const [showTaskEdit, setShowTaskEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);

  useEffect(() => {
    if (!user?.me && !userLoading) {
      navigate("/login");
    }
  }, [navigate, user?.me, userLoading]);

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

  if (project?.getProject.errors) {
    return (
      <div className="mt-8">
        {project.getProject.errors.map((error, i) => (
          <h2 key={i} className="text-center text-white">
            {error.type}: {error.message}
          </h2>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="m-2 my-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-between sm:items-center max-w-[860px] md:mx-auto">
        <div className="w-full md:mx-2 lg:mx-0 flex justify-between  items-center">
          <div className=" space-x-2">
            <button
              className="p-2 bg-blue-800 hover:bg-blue-600 text-white text-sm sm:w-[140px] rounded-md shadow-lg"
              onClick={() => setShowCreateForm(true)}
            >
              <div className="flex justify-center space-x-2">
                <PlusCircleIcon className="w-5" />
                <p>Add Task</p>
              </div>
            </button>
            <button
              className="p-2 bg-blue-800 text-white text-sm sm:w-[140px] rounded-md shadow-lg hover:bg-blue-600"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <div className="flex justify-center space-x-2">
                <TrashIcon className="w-5" />
                <p>Delete Project</p>
              </div>
            </button>
          </div>
          <div>
            <button
              onClick={() => setShowInviteForm(true)}
              className="p-2 bg-gray-700 text-white text-sm sm:w-[140px] rounded-md shadow-lg hover:bg-gray-600"
            >
              <div className="flex justify-center space-x-2 items-center">
                <UserAddIcon className="w-5" />
                <p>Invite User</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-screen mt-4 mx-2 space-x-2 justify-center">
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
            project={project}
            task={taskShown}
            setTaskShown={setTaskShown}
            setShowTaskInfo={setShowTaskInfo}
            setShowTaskEdit={setShowTaskEdit}
          />
        )}

        {showTaskEdit && (
          <EditTask
            setShowTaskEdit={setShowTaskEdit}
            project={project}
            task={taskShown}
          />
        )}

        {showDeleteConfirm && (
          <DeleteProjectConfirm
            project={project}
            setShowDeleteConfirm={setShowDeleteConfirm}
          />
        )}

        {showInviteForm && (
          <InviteForm
            setShowInviteForm={setShowInviteForm}
            projectId={params.projectId}
            userId={user.me.id}
          />
        )}
      </div>
    </>
  );
}

export default ProjectBoard;
