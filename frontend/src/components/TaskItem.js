import React, { useState, useEffect } from "react";
import { formatTaskTitle, formatDeadline } from "../utils/helpers";

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const isDone = task.status === "Completed";
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title || "");
  const [editedDeadline, setEditedDeadline] = useState(task.deadline || "");

  useEffect(() => {
    setEditedTitle(task.title || "");
    setEditedDeadline(task.deadline || "");
  }, [task]);

  const saveEdit = () => {
    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) return;

    onEdit(task.id, {
      title: trimmedTitle,
      deadline: editedDeadline || null,
    });

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task-item edit-mode">
        <div className="task-info edit-form">
          <input
            className="edit-input"
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            className="edit-input"
            type="datetime-local"
            value={editedDeadline}
            onChange={(e) => setEditedDeadline(e.target.value)}
          />
        </div>

        <div className="task-buttons">
          <button className="btn-save" onClick={saveEdit}>
            Save
          </button>
          <button className="btn-cancel" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-item">
      <div className="task-info">
        <div className="task-main-line">
          <span
            className={`task-status-dot ${isDone ? "completed" : "pending"}`}
            aria-label={isDone ? "Completed task" : "Pending task"}
          />
          <span className={isDone ? "task-done" : ""}>
            {formatTaskTitle(task.title)}
          </span>
        </div>

        {task.deadline && (
          <div className="task-deadline">
            Due: {formatDeadline(task.deadline)}
          </div>
        )}
      </div>

      <div className="task-buttons">
        <button
          className="btn-toggle"
          onClick={() => onToggle(task.id, isDone ? "Pending" : "Completed")}
        >
          {isDone ? "Reopen" : "Done"}
        </button>
        <button className="btn-edit" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
