const AuthenticationService = {
  isAuthenticated: () => {
    const user = localStorage.getItem('user');
    return user !== null;
  },
  login: async (email, password) => {
    new Promise((resolve, reject) => {
      if (email === 'admin@mail.com' && password === 'admin') {
        localStorage.setItem('user', JSON.stringify({ email, password }));
        resolve(true);
      }
      reject(false);
    });
  },
  logout: async () => {
    new Promise((resolve, reject) => {
      localStorage.removeItem('user');
      resolve(true);
    });
  },
};

export default AuthenticationService;
