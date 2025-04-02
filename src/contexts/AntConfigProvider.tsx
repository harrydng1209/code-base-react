import { DEFAULT } from '@/constants/theme-colors.const';
import { useTheme } from '@/hooks/shared/use-theme';
import { useThemeColor } from '@/hooks/shared/use-theme-color';
import { theme as antTheme, ConfigProvider, type ThemeConfig } from 'antd';

interface IProps extends React.PropsWithChildren {}

export const AntConfigProvider: React.FC<IProps> = (props) => {
  const { children } = props;

  const { isDark } = useTheme();
  const { getThemeColor } = useThemeColor();

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
        borderColor: getThemeColor('BORDER'),
      },
    },
    cssVar: false,
    hashed: false,
    token: {
      colorBgContainer: getThemeColor('BACKGROUND_CONTAINER'),
      colorBgElevated: getThemeColor('BACKGROUND_ELEVATED'),
      colorBorder: getThemeColor('BORDER'),
      colorPrimary: DEFAULT.PRIMARY,
      colorText: getThemeColor('TEXT'),
      colorTextPlaceholder: getThemeColor('TEXT_PLACEHOLDER'),
    },
  };

  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
};
