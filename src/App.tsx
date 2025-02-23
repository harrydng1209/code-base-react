import TheLoading from '@/components/shared/TheLoading';
import AntConfigProvider from '@/contexts/AntConfigProvider';
import { BrowserRouter } from 'react-router';

import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  return (
    <AntConfigProvider>
      <TheLoading />

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AntConfigProvider>
  );
};

export default App;
