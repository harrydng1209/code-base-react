import IconDashboard from '@/assets/icons/shared/IconDashboard.svg?react';
import IconFolderShared from '@/assets/icons/shared/IconFolderShared.svg?react';
import IconLogo from '@/assets/icons/shared/IconLogo.svg?react';
import IconSettings from '@/assets/icons/shared/IconSettings.svg?react';
import styles from '@/assets/styles/components/the-sidebar.module.scss';
import useTheme from '@/hooks/shared/use-theme';
import { Menu } from 'antd';
import { Link } from 'react-router';

const { AUTH, BASE_COMPONENTS, HOME } = constants.routePages;
const { themeColors } = constants;

const TheSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { isDark, theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: <IconDashboard fill={themeColors[theme].ICON_SVG} />,
      key: AUTH.LOGIN,
      label: t('shared.navigator.login'),
    },
    {
      icon: <IconSettings fill={themeColors[theme].ICON_SVG} />,
      key: AUTH.REGISTER,
      label: t('shared.navigator.register'),
    },
    {
      icon: <IconFolderShared fill={themeColors[theme].ICON_SVG} />,
      key: BASE_COMPONENTS,
      label: t('shared.navigator.base-components'),
    },
  ];
  const selectedKey =
    menuItems.find((item) => item.key === location.pathname)?.key || '';

  return (
    <div className={styles['container']}>
      <div className={styles['container__logo']}>
        <Link to={HOME}>
          <IconLogo />
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
