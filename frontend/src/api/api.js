// src/api/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5012' // ✅ Porta HTTP do .NET, evite HTTPS local
});

export default api;
