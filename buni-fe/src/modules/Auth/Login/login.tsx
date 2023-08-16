import React from 'react';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import useLogin from './useLogin';
import LanguageSwitcher from '@/components/LanguageSwitcher/languageSwitcher';

function Login() {
  const { handleSubmit } = useLogin();

  return (
    <div className="mt-40 flex flex-row">
      <Form
        name="login-form"
        className="max-w-screen-sm rounded bg-gray-200 p-3"
        initialValues={{
          email: '',
          password: '',
        }}
        onFinish={handleSubmit}
        style={{ width: 400, margin: '0 auto' }}
      >
        <div className="mb-4 flex w-full items-center justify-center">
          <img src="/logo.png" alt="Site" height="50px" className="mx-auto" />
        </div>

        <LanguageSwitcher />

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
