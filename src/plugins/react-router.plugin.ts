import { createBrowserRouter, RouteObject } from 'react-router';

type TModules = Record<string, { default: RouteObject }>;

const routes: Array<RouteObject> = [];
const modules: TModules = import.meta.glob('@/routes/*.tsx', {
  eager: true,
});

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

const reactRouterPlugin = createBrowserRouter([...routes]);

export default reactRouterPlugin;
