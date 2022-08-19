import { useMutation } from "@apollo/client";
import { XIcon } from "@heroicons/react/solid";
import React, { useRef } from "react";
import { EDIT_TASK } from "../graphql/mutations/task";
import { GET_PROJECT } from "../graphql/queries/project";

function EditTask({ project, setShowTaskEdit, task }) {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const dueRef = useRef();
  const [editTask] = useMutation(EDIT_TASK, {
    refetchQueries: [
      {
        query: GET_PROJECT,
        variables: {
          projectId: project?.getProject.id,
        },
      },
      "getProject",
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const d = new Date(dueRef.current.value);

    const edittedTask = await editTask({
      variables: {
        id: task.id,
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        due: d.getTime(),
      },
    });
    if (edittedTask) {
      setShowTaskEdit(false);
    }
  };

  return (
    <div className="absolute w-full top-0 right-0 bg-gray-600 bg-opacity-60 h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border m-auto p-4 pb-6 items-center w-3/4 bg-white rounded-md mt-24 max-w-[600px]"
      >
        <XIcon
          onClick={() => setShowTaskEdit(false)}
          className="w-5 self-end cursor-pointer hover:scale-110"
        />
        <h2>Edit Task Information</h2>

        <input
          name="name"
          ref={nameRef}
          placeholder="Task name"
          className="w-3/4 py-2 px-4 border rounded-md border-gray-400 mt-4"
        />
        <textarea
          name="description"
          ref={descriptionRef}
          className="w-3/4 py-2 px-4 border rounded-md border-gray-400 mt-4"
          placeholder="Description"
        />
        <div className="w-3/4 mt-2">
          <label htmlFor="due">Due Date</label>
          <input
            name="due"
            ref={dueRef}
            type="date"
            className="w-full py-2 px-4 border rounded-md border-gray-400"
          />
        </div>
        <button className="drop-shadow-md rounded-md p-2 w-3/4 bg-blue-600 text-white mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditTask;