import { useQuery } from "@apollo/client";
import { PlusCircleIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GET_INVITES } from "../graphql/queries/invitations";
import { PROJECTS_BY_USER_ID } from "../graphql/queries/project";
import CreateProject from "./CreateProject";
import Invites from "./Invites";
import ProjectThumbnail from "./ProjectThumbnail";

function Home({ user, userLoading }) {
  const navigate = useNavigate();
  const { loading, data: projects } = useQuery(PROJECTS_BY_USER_ID);
  const { loading: invitesloading, data: invites } = useQuery(GET_INVITES);
  const [openCreateProject, setOpenCreateProject] = useState(false);

  useEffect(() => {
    if (!user?.me && !userLoading) {
      navigate("/login");
    }
  }, [navigate, user?.me, userLoading]);

  return (
    <div className="h-full">
      {openCreateProject ? (
        <CreateProject
          user={user}
          setOpenCreateProject={setOpenCreateProject}
          openCreateProject={openCreateProject}
        />
      ) : null}
      <div className="p-8 px-2 md:px-8 w-full mx-auto items-center h-full">
        <div className="w-full flex justify-between">
          <h2 className="text-4xl mb-4 text-white">My Projects</h2>
          <button
            className="p-2 bg-blue-800 hover:bg-blue-600 h-10 text-white text-sm sm:w-[140px] rounded-md shadow-lg"
            onClick={() => setOpenCreateProject(true)}
          >
            <div className="flex justify-center space-x-2">
              <PlusCircleIcon className="w-5" />
              <p>Create Project</p>
            </div>
          </button>
        </div>
        {loading ? (
          <div>
            <p className="text-center text-xl text-white">Loading...</p>
          </div>
        ) : (
          <div className="flex">
            <div className="flex gap-2 max-w-full overflow-x-auto scrollbar">
              {projects?.getProjectsByUserId.map((userProject) => (
                <ProjectThumbnail
                  user={user}
                  key={userProject.project.id}
                  name={userProject.project.name}
                  id={userProject.project.id}
                />
              ))}
            </div>
          </div>
        )}
        <div className="mt-4">
          <h2 className="text-4xl mb-4 text-white">My Invitations</h2>
          <div className="text-white bg-gray-800 rounded p-4 h-full">
            {invitesloading ? (
              <div>
                <p className="text-center text-xl text-white">Loading...</p>
              </div>
            ) : invites?.getInvites.length === 0 ? (
              <p>No current invitations pending.</p>
            ) : (
              <div className="space-y-2">
                {invites?.getInvites.map((invite) => (
                  <Invites key={invite.id} invite={invite} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
