import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:8089/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosConfig;