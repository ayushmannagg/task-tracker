import React from "react";
import TaskItem from "./TaskItem";

/**
 * Renders a mapped list of tasks
 * @param {Object} props
 * @param {Array} props.tasks - Array of current tasks
 * @param {string} props.currentFilter - Active status filter
 * @param {Function} props.onToggleStatus - Status update handler
 * @param {Function} props.onRemoveTask - Task removal handler
 * @param {Function} props.onEditTask - Task edit handler
 */
const TaskList = ({
  tasks,
  currentFilter,
  onToggleStatus,
  onRemoveTask,
  onEditTask,
}) => {
  // Filter tasks by status
  const filtered = tasks.filter(
    (task) => currentFilter === "All" || task.status === currentFilter,
  );

  // Sort by deadline (closest first, then no deadline)
  const sorted = filtered.sort((a, b) => {
    if (a.deadline && b.deadline) {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    if (a.deadline) return -1;
    if (b.deadline) return 1;
    return 0;
  });

  if (sorted.length === 0) {
    return (
      <div className="task-list">
        <p className="empty-message">No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {sorted.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleStatus}
          onDelete={onRemoveTask}
          onEdit={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
