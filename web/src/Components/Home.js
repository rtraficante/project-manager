import { useQuery } from "@apollo/client";
import { PlusCircleIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PROJECTS_BY_USER_ID } from "../graphql/queries/project";
import CreateProject from "./CreateProject";
import ProjectThumbnail from "./ProjectThumbnail";

function Home({ user, userLoading }) {
  const navigate = useNavigate();
  const { loading, data: projects } = useQuery(PROJECTS_BY_USER_ID);
  const [openCreateProject, setOpenCreateProject] = useState(false);

  useEffect(() => {
    if (!user?.me && !userLoading) {
      navigate("/login");
    }
  }, [navigate, user?.me, userLoading]);

  return (
    <div>
      {openCreateProject ? (
        <CreateProject
          user={user}
          setOpenCreateProject={setOpenCreateProject}
          openCreateProject={openCreateProject}
        />
      ) : null}
      <div className="p-8 px-2 md:px-8 w-full mx-auto flex-col items-center inline-block">
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
            <div className="flex gap-2 max-w-full overflow-x-scroll scrollbar">
              {projects?.getProjectsByUserId.map((project) => (
                <ProjectThumbnail
                  user={user}
                  key={project.id}
                  name={project.name}
                  id={project.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
