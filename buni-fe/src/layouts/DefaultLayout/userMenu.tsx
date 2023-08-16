import React, { useState } from 'react';
import { Popover, Button } from 'antd';
import ChangePasswordModal from '@/components/ChangePasswordModal';

const UserMenu = () => {
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);
  const toggleChangePasswordModal = () => {
    setOpenChangePasswordModal((prev) => !prev);
  };

  const content = () => {
    return (
      <div className="flex flex-col">
        <Button
          type="text"
          className="cursor-pointer"
          onClick={() => toggleChangePasswordModal()}
        >
          Change password
        </Button>
        <Button type="text" className="cursor-pointer">
          Logout
        </Button>
      </div>
    );
  };

  return (
    <>
      <Popover placement="leftBottom" content={content} trigger="click">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          alt="User"
          width={40}
          height={40}
          className="cursor-pointer rounded-2xl"
        />
      </Popover>
      <ChangePasswordModal
        visible={openChangePasswordModal}
        onCancel={toggleChangePasswordModal}
      />
    </>
  );
};

export default UserMenu;
