const AuthenticationService = {
  isAuthenticated: () => {
    const user = localStorage.getItem('user');
    return user !== null;
  },
  login: async (email, password) => {
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email, password }));
      return true;
    }
    return false;
  },
  logout: async () => {
    localStorage.removeItem('user');
    return true;
  },
};

export default AuthenticationService;
