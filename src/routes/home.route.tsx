import { Home as HomePage } from '@/components/modules/Home';
import { HOME } from '@/constants/route-pages.const';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { ERole } from '@/models/enums/auth.enum';

export default {
  children: [
    {
      element: <HomePage />,
      index: true,
    },
  ],
  element: <DefaultLayout />,
  meta: {
    requiresAuth: true,
    roles: [
      ERole.Admin,
      ERole.Guest,
      ERole.Moderator,
      ERole.SuperAdmin,
      ERole.User,
    ],
    title: 'Home',
  },
  path: HOME,
};
