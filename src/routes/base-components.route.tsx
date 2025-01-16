import BaseComponents from '@/components/modules/BaseComponents.tsx';
import DefaultLayout from '@/layouts/DefaultLayout.tsx';
import ErrorLayout from '@/layouts/ErrorLayout.tsx';

const { BASE_COMPONENTS } = constants.routePages;
const { DEVELOP } = constants.shared.NODE_ENVS;
const isDevelopment = import.meta.env.VITE_NODE_ENV === DEVELOP;

export default {
  children: [
    {
      element: <BaseComponents />,
      index: true,
    },
  ],
  element: isDevelopment ? <DefaultLayout /> : <ErrorLayout />,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Base Components',
  },
  path: BASE_COMPONENTS,
};
