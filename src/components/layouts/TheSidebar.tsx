import styles from '@/assets/styles/layouts/the-sidebar.module.scss';
import BaseIconSvg from '@/components/base/BaseIconSvg';
import useThemeStore from '@/stores/theme.store';
import { Menu } from 'antd';
import { Link } from 'react-router';

const TheSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: (
        <BaseIconSvg
          fill={isDark ? constants.shared.COLORS.WHITE : constants.shared.COLORS.BLACK}
          path={constants.iconPaths.LAYOUTS.DASHBOARD}
        />
      ),
      key: constants.routePages.AUTH.LOGIN,
      label: t('shared.navigator.login')
    },
    {
      icon: (
        <BaseIconSvg
          fill={isDark ? constants.shared.COLORS.WHITE : constants.shared.COLORS.BLACK}
          path={constants.iconPaths.LAYOUTS.FOLDER_SHARED}
        />
      ),
      key: constants.routePages.BASE_COMPONENTS,
      label: t('shared.navigator.baseComponents')
    }
  ];

  return (
    <div className={styles['the-sidebar']}>
      <div className={styles['the-sidebar__logo']}>
        <Link to={constants.routePages.HOME}>
          <BaseIconSvg path={constants.iconPaths.SHARED.LOGO} />
        </Link>
      </div>

      <Menu
        defaultSelectedKeys={['1']}
        items={menuItems.map((item) => ({
          icon: item.icon,
          key: item.key,
          label: item.label
        }))}
        mode="inline"
        onClick={({ key }) => navigate(key)}
        theme={isDark ? 'dark' : 'light'}
      />
    </div>
  );
};

export default TheSidebar;
