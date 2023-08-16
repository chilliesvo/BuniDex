import React from 'react';
import {
  DesktopOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

export default function LayoutMenu() {
  const navigate = useNavigate();

  function getItem({
    label,
    key,
    icon,
    children,
    url,
  }: {
    label: React.ReactNode;
    key: React.Key;
    icon?: React.ReactNode;
    children?: MenuItem[];
    url?: string;
  }): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      onClick: () => {
        if (url) {
          navigate(url);
        }
      },
    } as MenuItem;
  }

  const menuItems: MenuItem[] = [
    getItem({
      label: 'Dashboard',
      key: '1',
      icon: <DesktopOutlined />,
      url: '/',
    }),
    getItem({
      label: 'User Manager',
      key: 'user_manager',
      icon: <UserOutlined />,
      children: [
        getItem({
          label: 'User',
          key: 'user_manager_user',
          icon: <UserOutlined />,
          url: '/user/user-manager',
        }),
        getItem({
          label: 'Administrator',
          key: 'user_manager_admin',
          icon: <UsergroupAddOutlined />,
          url: '/user/admin-manager',
        }),
      ],
    }),
    getItem({
      label: 'Settings',
      key: 'setting',
      icon: <SettingOutlined />,
      url: '/settings',
    }),
  ];

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="inline"
      items={menuItems}
    />
  );
}
