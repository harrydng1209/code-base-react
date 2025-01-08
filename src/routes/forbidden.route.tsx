import ErrorLayout from '@/layouts/ErrorLayout';

export default {
  element: <ErrorLayout />,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Forbidden'
  },
  path: constants.routePages.FORBIDDEN
};
