import Login from '@/components/modules/auth/Login';
import Register from '@/components/modules/auth/Register';
import { AUTH_PAGES } from '@/constants/route-pages.const';
import GuestLayout from '@/layouts/GuestLayout';

export default {
  children: [
    {
      element: <Login />,
      path: AUTH_PAGES.LOGIN,
    },
    {
      element: <Register />,
      path: AUTH_PAGES.REGISTER,
    },
  ],
  element: <GuestLayout />,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Authentication',
  },
  path: AUTH_PAGES.ROOT,
};
