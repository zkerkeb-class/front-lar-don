import { saveUser } from '../utils/save-user';
import httpService from './http-service';

const UsersService = {
  getCurrentUser: async () => {
    const user = localStorage.getItem('user');
    if (!user) return null;
    return JSON.parse(user);
  },
  getUserSubscription: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return null;

    return await httpService
      .get(`/users/${user.stripeId}/subscription`)
      .then(async (response) => {
        const subscription = response.data;

        return await httpService
          .put(`/users/${user._id}`, {
            ...user,
            subscriptionId: subscription.id,
          })
          .then((response) => {
            saveUser(response.data);
            return subscription;
          });
      });
  },
};

export default UsersService;
