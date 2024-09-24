import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';
import './login.css'; // Asegúrate de que esta línea esté presente

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/auth/login', values);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      setLoading(false);
      navigate(response.data.role === 'admin' ? '/admin' : '/worker');
    } catch (err) {
      setLoading(false);
      setError('Failed to login. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
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
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
