import Login from '@/components/modules/auth/Login';
import Register from '@/components/modules/auth/Register';
import GuestLayout from '@/layouts/GuestLayout';

const { AUTH } = constants.routePages;

export default {
  children: [
    {
      element: <Login />,
      path: AUTH.LOGIN,
    },
    {
      element: <Register />,
      path: AUTH.REGISTER,
    },
  ],
  element: <GuestLayout />,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Authentication',
  },
  path: AUTH.ROOT,
};
