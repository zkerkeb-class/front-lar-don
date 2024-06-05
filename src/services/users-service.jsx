import httpService from './http-service';
import AuthService from './auth-service';
import { getToken, setToken, getUser, setUser } from '../utils/storage-manager';

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
  sendConfirmEmail: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return null;

    return await httpService
      .post(`/users/send-confirm-email`, {
        user,
      })
      .then((response) => {
        return response.data;
      });
  },
  confirmEmail: async (token) => {
    return await httpService
      .post(`/users/confirm-email`, {
        token,
      })
      .then((response) => {
        if (response.data) {
          setToken(response.data.token);
          setUser(response.data.data);
        }
        return response;
      });
  },
  updatePhoneNumber: async (phoneNumber) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return null;

    return await httpService
      .put(`/users/${user._id}/phone-number`, {
        phoneNumber,
      })
      .then((response) => {
        setUser(response.data.data);
        setToken(response.data.token);
        return response.data;
      });
  },
  resetPassword: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return null;

    return await httpService
      .post(`/users/${user._id}/reset-password`)
      .then((response) => {
        return response.data;
      });
  },
  verifyResetPasswordToken: async (body) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return null;

    return await httpService
      .post(`/users/${user._id}/verify-reset-password`, body)
      .then((response) => {
        return response.data;
      });
  },
};

export default UsersService;
