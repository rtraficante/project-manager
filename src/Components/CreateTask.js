import { useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { CREATE_TASK } from "../graphql/mutations/task";

function CreateTask({ project }) {
  const navigate = useNavigate();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const dueRef = useRef();

  const [newTask] = useMutation(CREATE_TASK);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = await newTask({
      variables: {
        name: nameRef.current.value,
      },
    });
    if (task) {
      navigate(`/projects/${project.id}`);
    }
  };

  return (
    <div className="absolute w-full bg-gray-400 bg-opacity-60 h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border m-auto p-8 space-y-4 items-center w-3/4 bg-white rounded-md mt-8"
      >
        <h2>Add A New Task</h2>
        <input
          name="name"
          ref={nameRef}
          placeholder="Task name"
          className="w-3/4 py-2 px-4 border rounded-md border-gray-400 "
        />
        <textarea
          name="description"
          ref={descriptionRef}
          className="w-3/4 py-2 px-4 border rounded-md border-gray-400 "
          placeholder="Description"
        />
        <div className="w-3/4">
          <label htmlFor="due">Due Date</label>
          <input
            name="due"
            ref={dueRef}
            type="date"
            className="w-full py-2 px-4 border rounded-md border-gray-400"
          />
        </div>
        <button className="drop-shadow-md rounded-md p-2 w-3/4 bg-blue-600 text-white">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
