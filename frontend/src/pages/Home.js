import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {
  fetchTasks,
  addTask,
  modifyTask,
  removeTask,
} from "../services/task-service";

/**
 * The main landing page orchestrating task state
 */
const Home = () => {
  // TODO: Add loading and error states for API calls
  const [taskList, setTaskList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    loadTasks();
  }, []);

  /**
   * Initializes the application by fetching all tasks from the backend
   */
  const loadTasks = async () => {
    try {
      const taskData = await fetchTasks();
      setTaskList(taskData);
    } catch (error) {
      // FIXME: Implement proper error handling UI
      console.error("Failed to load tasks:", error);
      console.log(
        "Make sure the backend server is running on http://localhost:8000",
      );
    }
  };

  /**
   * Creates a new task and updates the task list
   * @param {Object} taskData - Task data from form
   */
  const insertTask = async (taskData) => {
    try {
      const newTask = await addTask(taskData);
      setTaskList([...taskList, newTask]);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  /**
   * Updates task status between Pending and Completed
   */
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const updatedTask = await modifyTask(taskId, { status: newStatus });
      setTaskList(taskList.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  /**
   * Removes a task from the list
   */
  const deleteTask = async (taskId) => {
    try {
      await removeTask(taskId);
      setTaskList(taskList.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  /**
   * Edits an existing task's title and deadline
   */
  const editTask = async (taskId, updatedData) => {
    try {
      const updatedTask = await modifyTask(taskId, updatedData);
      setTaskList((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
  };

  const totalTasks = taskList.length;
  const completedCount = taskList.filter(
    (task) => task.status === "Completed",
  ).length;
  const pendingCount = taskList.filter(
    (task) => task.status === "Pending",
  ).length;

  const filterCounts = {
    All: totalTasks,
    Pending: pendingCount,
    Completed: completedCount,
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <p className="subtitle">Organize your work & deadlines</p>
      </header>

      <div className="task-panel">
        <h2>Add Task</h2>
        <TaskForm onAdd={insertTask} />
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span className="summary-label">Total</span>
          <strong>{totalTasks}</strong>
        </div>
        <div className="summary-card done-card">
          <span className="summary-label">Done</span>
          <strong>{completedCount}</strong>
        </div>
        <div className="summary-card left-card">
          <span className="summary-label">Left</span>
          <strong>{pendingCount}</strong>
        </div>
      </div>

      <div className="filter-controls">
        {/* Filter buttons to display tasks by status */}
        {Object.keys(filterCounts).map((filterName) => (
          <button
            key={filterName}
            className={activeFilter === filterName ? "active-filter" : ""}
            onClick={() => setActiveFilter(filterName)}
          >
            <span>{filterName}</span>
            <span className="filter-count">{filterCounts[filterName]}</span>
          </button>
        ))}
      </div>

      <TaskList
        tasks={taskList}
        currentFilter={activeFilter}
        onToggleStatus={updateTaskStatus}
        onRemoveTask={deleteTask}
        onEditTask={editTask}
      />
    </div>
  );
};

export default Home;
