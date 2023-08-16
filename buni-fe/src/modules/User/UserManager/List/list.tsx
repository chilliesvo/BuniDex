import React from 'react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Table from '@/components/Table';

const UserList = () => {
  const data = [
    {
      key: '1',
      email: 'user1@example.com',
      name: 'User 1',
      department: 'Working Home',
      role: 'Admin',
    },
    {
      key: '2',
      email: 'user2@example.com',
      name: 'User 2',
      department: 'Office',
      role: 'User',
    },
  ];

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'actions',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />}>Remove</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default UserList;
