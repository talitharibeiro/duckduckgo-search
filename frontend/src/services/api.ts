import axios from "axios";

const API_URL = "http://localhost:3000/search";

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
