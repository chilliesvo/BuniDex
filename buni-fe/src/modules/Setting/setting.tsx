import React from 'react';
import { Button, Card, Form, Input, Radio } from 'antd';

const Setting = () => {
  const [form] = Form.useForm();

  return (
    <div>
      <Form form={form} layout="vertical" className="grid grid-cols-2 gap-5">
        <Card title="Website setting">
          <Form.Item label="Website URL">
            <Input placeholder="" />
          </Form.Item>

          <Form.Item label="Page Title">
            <Input placeholder="" />
          </Form.Item>

          <Form.Item label="Description">
            <Input placeholder="" />
          </Form.Item>
        </Card>
        <Card title="Payment setting">
          <Form.Item label="Website URL">
            <Input placeholder="" />
          </Form.Item>

          <Form.Item label="Page Title">
            <Input placeholder="" />
          </Form.Item>

          <Form.Item label="Description">
            <Input placeholder="" />
          </Form.Item>
        </Card>

        <div></div>
        <div className="actions flex justify-end">
          <Button htmlType="submit" type="primary">
            Save change
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Setting;
