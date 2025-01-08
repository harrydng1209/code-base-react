import useThemeStore from '@/stores/theme.store';
import { ConfigProvider, type ThemeConfig } from 'antd';

interface IProps extends React.PropsWithChildren {}

const AntConfigProvider: React.FC<IProps> = (props) => {
  const { children } = props;

  const { isDark } = useThemeStore();

  const config: ThemeConfig = {
    components: {
      Layout: {
        headerHeight: '75px'
      },
      Menu: {
        darkItemBg: '#111c2d'
      }
    },
    token: {
      colorBgContainer: isDark ? '#111c2d' : '#fff',
      colorBorder: isDark ? '#16293e' : '#d9d9d9',
      colorText: isDark ? '#fff' : '#000',
      colorTextPlaceholder: isDark ? '#fff' : '#000'
    }
  };

  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
};

export default AntConfigProvider;
