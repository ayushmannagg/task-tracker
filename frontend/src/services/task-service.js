const API_BASE_URL = 'http://localhost:8000/api/tasks';

/**
 * Fetches all tasks from the FastAPI server
 * @returns {Promise<Array>} List of task objects
 */
export const fetchTasks = async () => {
    const response = await fetch(API_BASE_URL);
    return await response.json();
};

/**
 * Sends a new task to the server
 * @param {Object} taskData - The task payload containing the title
 * @returns {Promise<Object>} The created task object
 */
export const addTask = async (taskData) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
    });
    return await response.json();
};

/**
 * Updates an existing task on the server
 * @param {string} id - The task ID to update
 * @param {Object} updateData - Data to update (e.g., status)
 * @returns {Promise<Object>} The updated task object
 */
export const modifyTask = async (id, updateData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
    });
    return await response.json();
};

/**
 * Deletes a task from the server
 * @param {string} id - The task ID to remove
 */
export const removeTask = async (id) => {
    await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
};