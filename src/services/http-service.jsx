import axios from 'axios';

const httpService = axios.create({
  baseURL: process.env.REACT_APP_URL_API, // Replace with your API base URL
  timeout: 5000, // Set a timeout value in milliseconds
  headers: {
    'Content-Type': 'application/json', // Set the default content type
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Set the default Authorization token
  },
  validateStatus: function (status) {
    return status < 400;
  },
});

export default httpService;
