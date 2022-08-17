import React, { useRef } from "react";

function EditTask() {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const dueRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const d = new Date(dueRef.current.value);

    // const task = await newTask({
    //   variables: {
    //     name: nameRef.current.value,
    //     description: descriptionRef.current.value,
    //     due: d.getTime(),
    //     projectId: project.getProject.id,
    //   },
    // });
    // if (task) {
    //   setShowForm(false);
    // }
  };

  return (
    <div className="absolute w-full bg-gray-400 bg-opacity-60 h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border m-auto p-4 pb-6  items-center w-3/4 bg-white rounded-md mt-8 max-w-[600px]"
      >
        {/* <XIcon
          className="w-5 self-end cursor-pointer hover:scale-110"
          onClick={() => setShowForm(false)}
        /> */}
        <h2>Add A New Task</h2>

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
        <div className="w-3/4">
          <label htmlFor="due">Due Date</label>
          <input
            name="due"
            ref={dueRef}
            type="date"
            className="w-full py-2 px-4 border rounded-md border-gray-400 mt-4"
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
