import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { PROJECTS_BY_USER_ID } from "../graphql/queries/project";
import CreateProject from "./CreateProject";
import ProjectThumbnail from "./ProjectThumbnail";

function Home({ user }) {
  const { loading, data: projects } = useQuery(PROJECTS_BY_USER_ID);
  const [openCreateProject, setOpenCreateProject] = useState(false);

  return (
    <div>
      {openCreateProject ? (
        <CreateProject
          user={user}
          setOpenCreateProject={setOpenCreateProject}
          openCreateProject={openCreateProject}
        />
      ) : null}
      <div className="p-8">
        {loading ? (
          <div>
            <p className="text-center text-xl">Loading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center md:justify-start md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:flex-wrap">
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
