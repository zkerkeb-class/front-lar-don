import { saveUser } from '../utils/save-user';
import httpService from './http-service';

const UsersService = {
  getCurrentUser: async () => {
    const user = localStorage.getItem('user');
    if (!user) return null;
    return JSON.parse(user);
  },
  updateSubscription: async (body) => {
    const user = await UsersService.getCurrentUser();
    if (!user) return null;
    user.subscriptionId = body.subscriptionId;
    console.log('user:', user);
    return await httpService
      .put(`/users/${user._id}`, user)
      .then((response) => {
        console.log('User updated:', response.data);
        // saveUser(response.data);
        return response;
      });
  },
};

export default UsersService;
