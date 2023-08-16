import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface ChangePasswordModalProps {
  visible: boolean;
  onCancel: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    try {
      await form.validateFields();
      setConfirmLoading(true);
      const values = form.getFieldsValue();
      // Simulate API call to change password
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setConfirmLoading(false);
      onCancel();
    } catch (error) {
      console.error('Error changing password', error);
    }
  };

  return (
    <Modal
      title="Change Password"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="change"
          type="primary"
          loading={confirmLoading}
          onClick={handleOk}
        >
          Change Password
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            {
              required: true,
              message: 'Please enter your current password',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: 'Please enter a new password',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          label="Confirm New Password"
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: 'Please confirm your new password',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords do not match'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
