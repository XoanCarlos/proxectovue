import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Obter usuario por id
export const getUsuarioById = async (id) => {
  return await axios.get(`${API_URL}/usuarios/${id}`);
};

// Obter tarefas por usuario
export const getTarefasByUsuario = async (usuarioId) => {
  return await axios.get(`${API_URL}/tarefas?usuarioId=${usuarioId}`);
};

// Crear tarefa
export const createTarefa = async (tarefa) => {
  return await axios.post(`${API_URL}/tarefas`, tarefa);
};

// Actualizar tarefa (parcial)
export const updateTarefa = async (id, data) => {
  return await axios.patch(`${API_URL}/tarefas/${id}`, data);
};