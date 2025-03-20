import axios from "axios";

export const API_BASE_URL = "http://localhost:8080"; // Ensure correct path


// Fetch all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Fetch a single task by ID
export const getTaskById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData: { title: string; description: string; status: string }) => {
    console.log("API Call: Sending task data:", taskData);
    try {
        const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};


// Update a task
export const updateTask = async (id: number, updatedTask: { title: string; description: string; status: string }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    throw error;
  }
};


// Delete a task
export const deleteTask = async (id: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw error;
  }
};
