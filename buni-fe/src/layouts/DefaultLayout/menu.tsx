import React from 'react';
import {
  RetweetOutlined,
  DollarOutlined,
  BlockOutlined,
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
      label: 'Trade',
      key: '1',
      icon: <RetweetOutlined />,
      url: '/',
    }),
    getItem({
      label: 'Liquidity',
      key: 'liquidity',
      icon: <BlockOutlined />,
      children: [
        getItem({
          label: 'Token',
          key: 'token',
          url: '/user/user-manager',
        }),
        getItem({
          label: 'Stablecoins',
          key: 'stablecoins',
          url: '/user/admin-manager',
        }),
      ],
    }),
    getItem({
      label: 'My Assets',
      key: 'my_assets',
      icon:<DollarOutlined />,
      url: '/',
    }),
    getItem({
      label: 'Partner Farms',
      key: 'partner_farms',
      icon: <BlockOutlined />,
      children: [
        getItem({
          label: 'Hero Arena',
          key: 'hero_arena',
          url: '/user/user-manager',
        }),
        getItem({
          label: 'Token Play',
          key: 'token_play',
          url: '/user/admin-manager',
        }),
      ],
    }),
    getItem({
      label: 'Farms',
      key: 'farms',
      icon: <BlockOutlined />,
      children: [
        getItem({
          label: 'Ancient Monster Farm',
          key: 'ancient_monster_farm',
          url: '/user/user-manager',
        }),
        getItem({
          label: 'NFT Farms',
          key: 'nft_farms',
          url: '/user/admin-manager',
        }),
        getItem({
          label: 'Pre-Staking',
          key: 'pre_staking',
          url: '/user/admin-manager',
        }),
      ],
    }),
    getItem({
      label: 'NFT Pools',
      key: 'nft_pools',
      icon: <BlockOutlined />,
      children: [
        getItem({
          label: 'Ancient BUNI (new)',
          key: 'ancient_buni_new',
          url: '/user/user-manager',
        }),
        getItem({
          label: 'Ancient BUNI (old)',
          key: 'ancient_buni_old',
          url: '/user/admin-manager',
        }),
        getItem({
          label: 'Bounty NFT',
          key: 'bounty_nft',
          url: '/user/admin-manager',
        }),
      ],
    }),
    getItem({
      label: 'VestingNFT',
      key: 'vesting_nft',
      icon:<DollarOutlined />,
      url: '/',
    }),
    getItem({
      label: 'Vote',
      key: 'vote',
      icon:<DollarOutlined />,
      url: '/',
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
