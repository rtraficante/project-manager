import { useQuery } from "@apollo/client";
import React from "react";
import { PROJECTS_BY_USER_ID } from "../graphql/queries/project";
import { ME } from "../graphql/queries/user";
import Navbar from "./Navbar";
import ProjectThumbnail from "./ProjectThumbnail";

function Home() {
  const { data: user } = useQuery(ME);

  const { loading, data: projects } = useQuery(PROJECTS_BY_USER_ID, {
    variables: {
      userId: user?.me.id || -1,
    },
  });
  console.log(projects);

  return (
    <div>
      <Navbar />
      <div className="p-8">
        {loading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : null}
        <div className="flex flex-col items-center md:justify-start md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:flex-wrap">
          <ProjectThumbnail name={"Create a new project"} />
          {projects?.getProjectsByUserId.map((project) => (
            <ProjectThumbnail key={project.id} name={project.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
