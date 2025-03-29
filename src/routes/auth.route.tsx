import Login from '@/components/modules/auth/Login';
import Register from '@/components/modules/auth/Register';
import { AUTH } from '@/constants/route-pages.const';
import GuestLayout from '@/layouts/GuestLayout';

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
