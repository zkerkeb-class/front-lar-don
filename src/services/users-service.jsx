import httpService from './http-service';
import AuthService from './auth-service';

const UsersService = {
  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    return await httpService
      .get(`/users/connected`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return AuthService.logout();
      });
  },
  getCustomerSecretId: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return null;

    return await httpService
      .get(`/users/${user._id}/customer-secret`)
      .then((response) => {
        return response.data;
      });
  },
  getUserSubscription: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return null;

    return await httpService
      .get(`/users/${user.stripeId}/subscription`)
      .then(async (response) => {
        const subscription = response.data;
        return subscription;
      });
  },
};

export default UsersService;
