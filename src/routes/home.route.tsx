import Home from '@/components/modules/Home.tsx';
import DefaultLayout from '@/layouts/DefaultLayout';
import { ERole } from '@/models/enums/auth.enum';

const { HOME } = constants.routePages;

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
  path: HOME,
};
