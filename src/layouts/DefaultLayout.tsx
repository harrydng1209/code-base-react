import styles from '@/assets/styles/layouts/default-layout.module.scss';
import TheSidebar from '@/components/layouts/TheSidebar';
import TheTopbar from '@/components/layouts/TheTopbar';
import { useWindowScroll } from '@reactuses/core';
import { Layout } from 'antd';
import { Outlet } from 'react-router';

const { Content, Header, Sider } = Layout;

const DefaultLayout: React.FC = () => {
  const { y } = useWindowScroll();

  const headerStyle = {
    marginTop: y > 50 ? '-20px' : '0',
    transition: 'margin-top 0.3s ease'
  };

  return (
    <Layout className={styles['default-layout']}>
      <Sider className={styles['default-layout__sidebar']} width={270}>
        <TheSidebar />
      </Sider>

      <Layout className={styles['default-layout__main']}>
        <Header className={styles['default-layout__main--header']} style={headerStyle}>
          <TheTopbar />
        </Header>

        <Content className={styles['default-layout__main--view']}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
