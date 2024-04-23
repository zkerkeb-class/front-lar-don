import httpService from "./http-service";

const AuthenticationService = {
  isAuthenticated: () => {
    const token = localStorage.getItem("authToken");
    return !!token; // Plus robuste si vous ajoutez une vérification de la validité du token
  },
  storeToken: (token) => {
    localStorage.setItem("authToken", token);
  },
  removeToken: () => {
    localStorage.removeItem("authToken");
  },
  login: async (body) => {
    return await httpService.post(`/users/login`, body).then((response) => {
      if (response.data.token) {
        this.storeToken(response.data.token); // Stockez le token au lieu de l'utilisateur
      }
      return response;
    });
  },
  loginWithGoogle: (token) => {
    this.storeToken(token);
  },
  logout: () => {
    this.removeToken(); // Supprimez le token lors de la déconnexion
  },
  getCurrentToken: () => {
    return localStorage.getItem("authToken");
  },
};

export default AuthenticationService;
