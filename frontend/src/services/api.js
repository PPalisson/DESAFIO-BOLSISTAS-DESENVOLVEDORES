import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7159', 
});

export default api;
    