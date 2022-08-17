import React from "react";

function Task({ task }) {
  return (
    <div className="bg-white rounded-md shadow-md mx-4 p-4">
      <h4>{task.name}</h4>
    </div>
  );
}

export default Task;
