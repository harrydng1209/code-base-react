import BaseComponents from '@/components/modules/BaseComponents.tsx';
import DefaultLayout from '@/layouts/DefaultLayout.tsx';
import ErrorLayout from '@/layouts/ErrorLayout.tsx';

const { NODE_ENV } = constants.shared;
const isDevelopment = import.meta.env.VITE_NODE_ENV === NODE_ENV.DEVELOPMENT;

export default {
  children: [
    {
      element: <BaseComponents />,
      index: true
    }
  ],
  element: isDevelopment ? <DefaultLayout /> : <ErrorLayout />,
  meta: {
    requiresAuth: false,
    roles: [],
    title: 'Base Components'
  },
  path: constants.routePages.BASE_COMPONENTS
};
