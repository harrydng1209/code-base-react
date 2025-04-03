import { AUTH_PAGES } from '@/constants/route-pages.const';
import { GuestLayout } from '@/layouts/GuestLayout';
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';

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
