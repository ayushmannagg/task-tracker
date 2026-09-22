import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  /**
   * Handles form submission and adds a new task
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return; // Don't add empty tasks

    const newTask = { title: trimmedTitle };
    if (deadline) newTask.deadline = deadline;

    onAdd(newTask);
    setTitle("");
    setDeadline("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Task:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to do?"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="deadline">Deadline:</label>
        <input
          id="deadline"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          title="Add a deadline (optional)"
        />
      </div>

      <button type="submit">+ Add Task</button>
    </form>
  );
};

export default TaskForm;
