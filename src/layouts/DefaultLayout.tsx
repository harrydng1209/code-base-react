import styles from '@/assets/styles/components/default-layout.module.scss';
import { TheSidebar } from '@/components/shared/TheSidebar';
import { TheTopbar } from '@/components/shared/TheTopbar';
import { useWindowScroll } from '@/hooks/shared/use-window-scroll';
import { Layout } from 'antd';
import { Outlet } from 'react-router';

const { Content, Header, Sider } = Layout;

export const DefaultLayout: React.FC = () => {
  const { y } = useWindowScroll();

  const headerStyle = {
    marginTop: y > 50 ? '-20px' : '0',
    transition: 'margin-top 0.3s ease',
  };

  return (
    <Layout className={styles['container']}>
      <Sider className={styles['container__sidebar']} width={270}>
        <TheSidebar />
      </Sider>

      <Layout className={styles['container__main']}>
        <Header
          className={styles['container__main--header']}
          style={headerStyle}
        >
          <TheTopbar />
        </Header>

        <Content className={styles['container__main--content']}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
