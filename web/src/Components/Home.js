import { useQuery } from "@apollo/client";
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
      <div className="p-8 max-w-[1200px] mx-auto flex flex-col items-center md:inline-block">
        <h2 className="text-4xl mb-4 text-white">My Projects</h2>
        {loading ? (
          <div>
            <p className="text-center text-xl text-white">Loading...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProjectThumbnail
              setOpenCreateProject={setOpenCreateProject}
              openCreateProject={openCreateProject}
              name={"Create a new project"}
            />
            {projects?.getProjectsByUserId.map((project) => (
              <ProjectThumbnail
                user={user}
                key={project.id}
                name={project.name}
                id={project.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
