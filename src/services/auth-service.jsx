import httpService from './http-service';

const AuthenticationService = {
  isAuthenticated: () => {
    // Check if the user is authenticated by looking for the user token
    return localStorage.getItem('token');
  },
  login: async (body) => {
    return await httpService.post(`/users/login`, body);
  },
  register: async (body) => {
    return await httpService.post(`/users/`, body);
  },
  logout: () => {
    // Remove the token to log out the user
    localStorage.removeItem('token');
  },
  getCurrentUser: async () => {
    const token = localStorage.getItem('token'); // For now, we don't have a token so we use the user id
    return await httpService.get(`/users/${token}`);
  },
};

export default AuthenticationService;
