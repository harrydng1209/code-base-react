import ErrorLayout from '@/layouts/ErrorLayout';

const { FORBIDDEN } = constants.routePages;

export default {
  element: <ErrorLayout />,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Forbidden',
  },
  path: FORBIDDEN,
};
