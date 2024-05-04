import httpService from './http-service';
import { getToken, setToken, getUser, setUser } from '../utils/storage-manager';

const AuthenticationService = {
  isAuthenticated: () => {
    // Check if the user is authenticated by looking for the user user
    return !!getToken();
  },
  login: async (body) => {
    return await httpService.post(`/users/login`, body).then((response) => {
      setToken(response.data.token);
      setUser(response.data.data);
      return response;
    });
  },
  loginWithGoogle: async (body) => {
    return await httpService
      .post('/users/login-google', body)
      .then((response) => {
        setToken(response.data.token);
        setUser(response.data.data);
        return response;
      });
  },
  loginWithDiscord: async (body) => {
    return await httpService
      .post('/users/login-discord', body)
      .then((response) => {
        setToken(response.data.token);
        setUser(response.data.data);
        return response;
      });
  },
  loginWithGithub: async (body) => {
    return await httpService
      .post('/users/login-github', body)
      .then((response) => {
        setToken(response.data.token);
        setUser(response.data.data);
        return response;
      });
  },
  register: async (body) => {
    return await httpService.post(`/users/`, body).then((response) => {
      setToken(response.data.token);
      setUser(response.data.data);
      return response;
    });
  },
  logout: () => {
    // Remove the user to log out the user
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
};

export default AuthenticationService;
