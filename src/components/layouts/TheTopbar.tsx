import styles from '@/assets/styles/layouts/the-topbar.module.scss';
import BaseDropdown from '@/components/base/BaseDropdown';
import BaseIconSvg from '@/components/base/BaseIconSvg';
import TheBreadcrumb from '@/components/layouts/TheBreadcrumb';
import { notifications } from '@/mocks/the-topbar.mock';
import { ELanguageCode } from '@/models/enums/shared.enum';
import useLanguageStore from '@/stores/language.store';
import useThemeStore from '@/stores/theme.store';
import { Avatar, Badge, MenuProps } from 'antd';

const { LAYOUTS, SHARED } = constants.iconPaths;
const { BLACK, WHITE } = constants.shared.COLORS;

const TheTopBar: React.FC = () => {
  const { changeTheme, isDark } = useThemeStore();
  const { changeLanguage, currentLanguage } = useLanguageStore();

  const i18nOptions = Object.entries(ELanguageCode).map(([key, value]) => ({
    label: key,
    value,
  }));

  const notificationMenu: MenuProps = {
    items: [
      ...notifications.map((notification) => ({
        key: notification.id,
        label: (
          <div>
            <p>{notification.message}</p>
            <p>{notification.time}</p>
          </div>
        ),
      })),
      {
        key: 'clear-all',
        label: <p>Clear All</p>,
      },
    ],
  };

  const getIconPathForLanguage = (lang: ELanguageCode) => {
    const iconPaths = {
      [ELanguageCode.English]: LAYOUTS.ENGLISH,
      [ELanguageCode.Japanese]: LAYOUTS.JAPANESE,
      [ELanguageCode.Vietnamese]: LAYOUTS.VIETNAMESE,
    };
    return iconPaths[lang];
  };

  const languageMenu: MenuProps = {
    items: i18nOptions.map((item) => ({
      key: item.value,
      label: (
        <div style={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
          <BaseIconSvg path={getIconPathForLanguage(item.value)} />
          <p>{item.label}</p>
        </div>
      ),
      onClick: () => changeLanguage(item.value),
    })),
  };

  return (
    <div className={styles['the-topbar']}>
      <section className="tw-flex-center">
        <TheBreadcrumb />
      </section>

      <section className={styles['the-topbar__profile']}>
        <BaseIconSvg
          fill={isDark ? WHITE : BLACK}
          onClick={changeTheme}
          path={isDark ? SHARED.LIGHT_MODE : SHARED.DARK_MODE}
        />

        <BaseDropdown menu={languageMenu}>
          <span>
            <BaseIconSvg path={getIconPathForLanguage(currentLanguage)} />
          </span>
        </BaseDropdown>

        <BaseDropdown menu={notificationMenu}>
          <Badge count={notifications.length}>
            <BaseIconSvg fill={isDark ? WHITE : BLACK} path={LAYOUTS.NOTIFICATION} />
          </Badge>
        </BaseDropdown>

        <BaseDropdown
          menu={{
            items: [
              { key: 'profile', label: 'Profile' },
              { key: 'settings', label: 'Settings' },
              { type: 'divider' },
              { key: 'logout', label: 'Logout' },
            ],
          }}
        >
          <Avatar className="tw-cursor-pointer">H</Avatar>
        </BaseDropdown>
      </section>
    </div>
  );
};

export default TheTopBar;
