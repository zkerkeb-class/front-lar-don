import httpService from './http-service';

const API_URL = process.env.REACT_APP_URL_API;
const AuthenticationService = {
  isAuthenticated: () => {
    // Check if the user is considered authenticated
    return localStorage.getItem('isAuthenticated') === 'true';
  },
  login: async (body) => {
    return await httpService.post(`${API_URL}/users/login`, body);
  },
  register: async (body) => {
    return await httpService.post(`${API_URL}/users/`, body);
  },
  logout: () => {
    // Remove the authentication marker to log out the user
    localStorage.removeItem('isAuthenticated');
  },
};

export default AuthenticationService;
