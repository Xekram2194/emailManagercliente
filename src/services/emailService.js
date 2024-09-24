import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getEmails = async () => {
  const response = await axios.get(`${API_URL}/api/emails`);
  return response.data;
};

export const assignEmail = async (emailId, workerName) => {
  const response = await axios.post(`${API_URL}/api/assign`, { emailId, workerName });
  return response.data;
};

// Obtener correos asignados a un trabajador
export const getEmailsForWorker = async (workerName) => {
  const response = await axios.get(`${API_URL}/emails?worker=${workerName}`);
  return response.data;
};

export const getWorkerEmails = async () => {
  const response = await axios.get(`${API_URL}/emails/worker`, {
    headers: { Authorization: localStorage.getItem('token') }, // Asegúrate de enviar el token
  });
  return response.data;
};