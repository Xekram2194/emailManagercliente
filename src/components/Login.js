import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Typography, Alert } from 'antd';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const onFinish = async (values) => {
    try {
        const response = await axios.post('http://localhost:3001/auth/login', values);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        navigate(response.data.role === 'admin' ? '/admin' : '/worker');
    } catch (err) {
        setError('Failed to login. Please check your credentials.');
        console.error('Login error:', err);
    }
};


  return (
    <div style={{ maxWidth: '300px', margin: '0 auto', paddingTop: '50px' }}>
      <Title level={2}>Login</Title>
      {error && <Alert message={error} type="error" showIcon closable afterClose={() => setError('')} />}
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
