import axios from 'axios';

const httpService = axios.create({
  baseURL: process.env.REACT_APP_URL_API, // Replace with your API base URL
  timeout: 5000, // Set a timeout value in milliseconds
  headers: {
    'Content-Type': 'application/json', // Set the default content type
  },
  validateStatus: function (status) {
    return status < 400;
  },
});

// Add a request interceptor to add the token to the headers
httpService.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpService;
