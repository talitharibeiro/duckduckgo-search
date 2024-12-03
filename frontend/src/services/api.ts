import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/search`;

export const searchApi = async (query: string, offset = 0, limit = 10) => {
  const response = await axios.get(
    `${API_URL}?q=${query}&offset=${offset}&limit=${limit}`
  );
  return response.data;
};

export const getHistory = async () => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data;
};

export const clearHistoryApi = async () => {
  await axios.delete(`${API_URL}/history`);
};
