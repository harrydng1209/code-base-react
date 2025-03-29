import BaseComponents from '@/components/modules/BaseComponents.tsx';
import { BASE_COMPONENTS } from '@/constants/route-pages.const';
import { NODE_ENVS } from '@/constants/shared.const';
import DefaultLayout from '@/layouts/DefaultLayout.tsx';
import ErrorLayout from '@/layouts/ErrorLayout.tsx';

const isDevelop = import.meta.env.VITE_NODE_ENV === NODE_ENVS.DEVELOP;

export default {
  children: [
    {
      element: <BaseComponents />,
      index: true,
    },
  ],
  element: isDevelop ? <DefaultLayout /> : <ErrorLayout />,
  meta: {
    requiresAuth: true,
    roles: [],
    title: 'Base Components',
  },
  path: BASE_COMPONENTS,
};
