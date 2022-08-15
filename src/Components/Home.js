import { useQuery } from "@apollo/client";
import React, { useState } from "react";

import { PROJECTS_BY_USER_ID } from "../graphql/queries/project";
import { ME } from "../graphql/queries/user";
import CreateProject from "./CreateProject";
import Navbar from "./Navbar";
import ProjectThumbnail from "./ProjectThumbnail";

function Home() {
  const { data: user } = useQuery(ME);
  const { loading, data: projects } = useQuery(PROJECTS_BY_USER_ID, {
    variables: {
      userId: user?.me?.id || -1,
    },
  });
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
      <Navbar />
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
              <ProjectThumbnail key={project.id} name={project.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
