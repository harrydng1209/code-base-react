import { BASE_COMPONENTS } from '@/constants/route-pages.const';
import { NODE_ENVS } from '@/constants/shared.const';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { ErrorLayout } from '@/layouts/ErrorLayout';
import { BaseComponents } from '@/pages/BaseComponents';

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
