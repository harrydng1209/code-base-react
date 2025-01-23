import useThemeStore from '@/stores/theme.store';
import { theme as antTheme, ConfigProvider, type ThemeConfig } from 'antd';

const { DEFAULT } = constants.themeColors;
const { themeColors } = constants;

interface IProps extends React.PropsWithChildren {}

const AntConfigProvider: React.FC<IProps> = (props) => {
  const { children } = props;

  const { isDark, theme } = useThemeStore();

  const config: ThemeConfig = {
    algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    components: {
      Button: {
        primaryShadow: '',
      },
      Layout: {
        headerHeight: '75px',
      },
      Menu: {
        darkItemBg: '#111c2d',
      },
      Table: {
        borderColor: themeColors[theme].BORDER,
      },
    },
    cssVar: false,
    hashed: false,
    token: {
      colorBgContainer: themeColors[theme].BACKGROUND_CONTAINER,
      colorBgElevated: themeColors[theme].BACKGROUND_ELEVATED,
      colorBorder: themeColors[theme].BORDER,
      colorPrimary: DEFAULT.PRIMARY,
      colorText: themeColors[theme].TEXT,
      colorTextPlaceholder: themeColors[theme].TEXT_PLACEHOLDER,
    },
  };

  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
};

export default AntConfigProvider;
