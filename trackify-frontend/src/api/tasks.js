import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/tasks";

export const getAllTasks = () => axios.get(API_BASE_URL);

export const getTaskById = (id) => axios.get(`${API_BASE_URL}/${id}`);

export const createTask = (task) => axios.post(API_BASE_URL, task);

export const updateTask = (id, updatedTask) =>
  axios.put(`${API_BASE_URL}/${id}`, updatedTask);

export const deleteTask = (id) => axios.delete(`${API_BASE_URL}/${id}`);
