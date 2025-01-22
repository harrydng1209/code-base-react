import useThemeStore from '@/stores/theme.store';
import { Outlet } from 'react-router';

const GuestLayout: React.FC = () => {
  useThemeStore();

  return <Outlet />;
};

export default GuestLayout;
