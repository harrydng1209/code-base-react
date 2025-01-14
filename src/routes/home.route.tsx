import Home from '@/components/modules/Home.tsx';
import DefaultLayout from '@/layouts/DefaultLayout';
import { ERole } from '@/models/enums/auth.enum';

export default {
  children: [
    {
      element: <Home />,
      index: true,
    },
  ],
  element: <DefaultLayout />,
  meta: {
    requiresAuth: false,
    roles: [ERole.Admin, ERole.Guest, ERole.Moderator, ERole.SuperAdmin, ERole.User],
    title: 'Home',
  },
  path: constants.routePages.HOME,
};
