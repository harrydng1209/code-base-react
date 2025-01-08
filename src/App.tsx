import AntConfigProvider from '@/contexts/AntConfigProvider';
import reactRouterPlugin from '@/plugins/react-router.plugin';
import { RouterProvider } from 'react-router';

const App = () => {
  return (
    <AntConfigProvider>
      <RouterProvider router={reactRouterPlugin} />
    </AntConfigProvider>
  );
};

export default App;
