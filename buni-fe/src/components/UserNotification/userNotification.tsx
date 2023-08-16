import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Avatar, List, Popover } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
const UserNotification = () => {
  const content = () => {
    return (
      <List
        itemLayout="horizontal"
        className="w-[400px]"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    );
  };

  return (
    <Popover placement="leftBottom" content={content} trigger="click">
      <BellOutlined className="scale-125" />
    </Popover>
  );
};

export default UserNotification;
