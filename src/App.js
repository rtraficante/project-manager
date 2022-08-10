import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";

const ALL_PROJECTS = gql`
  query {
    allProjects {
      id
      name
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(ALL_PROJECTS);

  if (error)
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  if (loading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <div>
        {data.allProjects.map((project) => (
          <div>
            <p>{project.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
