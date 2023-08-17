import { Breadcrumb, Layout, theme } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import UserNotification from '@/components/UserNotification';
import Menu from './menu';
import UserMenu from './userMenu';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="flex w-full items-center justify-center p-3">
          <img src="/logo.svg" height="30px" alt="header logo" />
        </div>
        <Menu />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: "#f9801a" }}
          className="flex items-center justify-between !px-[24px]"
        >
          <div className="left">
            <Breadcrumb
              routes={[
                {
                  path: '/home',
                  breadcrumbName: 'Home',
                },
                {
                  path: '/user',
                  breadcrumbName: 'User',
                },
              ]}
            />
          </div>
          <div className="right flex items-center gap-6">
            <UserNotification />
            <LanguageSwitcher />
            <UserMenu />
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              marginTop: 20,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
