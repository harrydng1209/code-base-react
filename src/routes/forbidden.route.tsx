import { FORBIDDEN } from '@/constants/route-pages.const';
import ErrorLayout from '@/layouts/ErrorLayout';

export default {
  element: <ErrorLayout />,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Forbidden',
  },
  path: FORBIDDEN,
};
