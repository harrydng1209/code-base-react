import Login from '@/components/modules/auth/Login';
import GuestLayout from '@/layouts/GuestLayout';

export default {
  children: [
    {
      element: <Login />,
      path: constants.routePages.AUTH.LOGIN,
    },
  ],
  element: <GuestLayout />,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Authentication',
  },
  path: constants.routePages.AUTH.ROOT,
};
