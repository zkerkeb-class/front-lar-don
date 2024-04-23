import { saveUser } from "../utils/save-user";
import httpService from "./http-service";

const AuthenticationService = {
  isAuthenticated: () => {
    // Check if the user is authenticated by looking for the user user
    return (
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user"))._id
    );
  },
  login: async (body) => {
    return await httpService.post(`/users/login`, body).then((response) => {
      saveUser({
        ...response.data.user,
        customerSecretId: response.data.customerSecretId,
      });
      return response;
    });
  },
  register: async (body) => {
    return await httpService.post(`/users/`, body).then((response) => {
      saveUser({
        ...response.data.user,
        customerSecretId: response.data.customerSecretId,
      });
      return response;
    });
  },
  logout: () => {
    // Remove the user to log out the user
    localStorage.removeItem("user");
  },
  getCurrentUser: async () => {
    const user = localStorage.getItem("user");
    if (!user) return null;
    return JSON.parse(user);
  },
};

export default AuthenticationService;
