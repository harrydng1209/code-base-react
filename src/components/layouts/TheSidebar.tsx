import styles from '@/assets/styles/layouts/the-sidebar.module.scss';
import BaseIconSvg from '@/components/base/BaseIconSvg';
import useThemeStore from '@/stores/theme.store';
import { Menu } from 'antd';
import { Link } from 'react-router';

const { LAYOUTS, SHARED } = constants.iconPaths;
const { BLACK, WHITE } = constants.shared.COLORS;
const { AUTH, BASE_COMPONENTS, HOME } = constants.routePages;

const TheSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: <BaseIconSvg fill={isDark ? WHITE : BLACK} path={LAYOUTS.DASHBOARD} />,
      key: AUTH.LOGIN,
      label: t('shared.navigator.login'),
    },
    {
      icon: <BaseIconSvg fill={isDark ? WHITE : BLACK} path={LAYOUTS.FOLDER_SHARED} />,
      key: BASE_COMPONENTS,
      label: t('shared.navigator.base-components'),
    },
  ];
  const selectedKey = menuItems.find((item) => item.key === location.pathname)?.key || '';

  return (
    <div className={styles['the-sidebar']}>
      <div className={styles['the-sidebar__logo']}>
        <Link to={HOME}>
          <BaseIconSvg path={SHARED.LOGO} />
        </Link>
      </div>

      <Menu
        items={menuItems.map((item) => ({
          icon: item.icon,
          key: item.key,
          label: item.label,
        }))}
        mode="inline"
        onClick={({ key }) => navigate(key)}
        selectedKeys={[selectedKey]}
        theme={isDark ? 'dark' : 'light'}
      />
    </div>
  );
};

export default TheSidebar;
