import useThemeStore from '@/stores/theme.store';
import { ConfigProvider, theme, type ThemeConfig } from 'antd';

interface IProps extends React.PropsWithChildren {}

const { BLACK, PRIMARY, WHITE } = constants.shared.COLORS;

const AntConfigProvider: React.FC<IProps> = (props) => {
  const { children } = props;

  const { isDark } = useThemeStore();

  const config: ThemeConfig = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    components: {
      Button: {
        primaryShadow: ''
      },
      Layout: {
        headerHeight: '75px'
      },
      Menu: {
        darkItemBg: '#111c2d'
      },
      Table: {
        borderColor: isDark ? '#4a4a4a' : '#d9d9d9'
      }
    },
    cssVar: false,
    hashed: false,
    token: {
      colorBgContainer: isDark ? '#111c2d' : WHITE,
      colorBgElevated: isDark ? '#111c2d' : WHITE,
      colorBorder: isDark ? '#4a4a4a' : '#d9d9d9',
      colorPrimary: PRIMARY,
      colorText: isDark ? WHITE : BLACK,
      colorTextPlaceholder: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0,0,0,0.25)'
    }
  };

  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
};

export default AntConfigProvider;
