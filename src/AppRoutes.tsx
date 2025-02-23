import { ERole } from '@/models/enums/auth.enum';
import useAuthStore from '@/stores/auth.store';
import { Navigate, Route, RouteObject, Routes } from 'react-router';

type TModules = Record<string, { default: TRouteObject }>;

type TRouteObject = RouteObject & {
  meta?: {
    requiresAuth: boolean;
    roles: ERole[];
    title: string;
  };
};

const ProtectedRoute: React.FC<{ route: TRouteObject }> = ({ route }) => {
  const authStore = useAuthStore();
  const [element, setElement] = useState<React.ReactNode>(null);

  useEffect(() => {
    const guard = async () => {
      if (route.meta?.title) document.title = route.meta.title;

      if (route.meta?.requiresAuth) {
        await authStore.actions.initialize();

        if (!authStore.isAuthenticated) {
          setElement(<Navigate replace to={constants.routePages.AUTH.LOGIN} />);
          return;
        }

        const requiresRoles = route.meta.roles || [];
        const userRole = authStore.userInfo?.role;
        const hasRequiredRole = requiresRoles.some((role) => role === userRole);

        if (requiresRoles.length && !hasRequiredRole) {
          setElement(<Navigate replace to={constants.routePages.FORBIDDEN} />);
          return;
        }
      }
      setElement(route.element);
    };
    guard();
  }, [route]);

  return element;
};

const renderRoutes = (routes: Array<TRouteObject>) => {
  return routes.map((route, index) => {
    const hasChildren = route.children && route.children.length > 0;

    if (hasChildren)
      return (
        <Route
          element={<ProtectedRoute route={route} />}
          key={index}
          path={route.path}
        >
          {route.children &&
            route.children.map((child, childIndex) => (
              <Route
                element={<ProtectedRoute route={child as TRouteObject} />}
                index={child.index}
                key={childIndex}
                path={child.path}
              />
            ))}
        </Route>
      );

    return (
      <Route
        element={<ProtectedRoute route={route} />}
        key={index}
        path={route.path}
      />
    );
  });
};

const AppRoutes: React.FC = () => {
  const modules: TModules = import.meta.glob('@/routes/*.tsx', {
    eager: true,
  });
  const routes: Array<TRouteObject> = Object.values(modules).map((module) => ({
    ...module.default,
  }));

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default AppRoutes;
