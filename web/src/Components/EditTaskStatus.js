import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { EDIT_TASK_STATUS } from "../graphql/mutations/task";
import { GET_PROJECT } from "../graphql/queries/project";

function EditTaskStatus({ task, project, setShowTaskInfo }) {
  const [selectedOption, setSelectedOption] = useState(task.status);

  const [setStatus] = useMutation(EDIT_TASK_STATUS, {
    refetchQueries: [
      {
        query: GET_PROJECT,
        variables: {
          projectId: project?.getProject.project.id,
        },
      },
      "getProject",
    ],
  });

  const handleChange = async (e) => {
    setSelectedOption(e.target.value);

    await setStatus({
      variables: {
        id: task.id,
        status: e.target.value,
      },
    });
    setShowTaskInfo(false);
  };

  return (
    <form>
      <select
        onChange={handleChange}
        value={selectedOption}
        className="border rounded p-1 text-sm bg-gray-700"
      >
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </form>
  );
}

export default EditTaskStatus;
