// src/components/LoginForm.tsx
import React from 'react';
import { Form, Button, Input } from 'antd';


interface LoginFormProps {
  onFinish: (values: any) => void; // 通过 props 传入表单提交的回调函数
	loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onFinish, loading}) => {
  return (
    <Form
      name='basic'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete='off'
    >
      <Form.Item
        name='userName'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='userPwd'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type='primary' block htmlType='submit' loading={loading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
