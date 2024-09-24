import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Login from './components/Login';
import AdminView from './components/AdminView';
import WorkerView from './components/WorkerView';
import PrivateRoute from './components/PrivateRoute';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Header style={{ color: 'white' }}>Gestor de Correos</Header>
        <Content style={{ padding: '20px' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<PrivateRoute element={AdminView} roles={['admin']} />} />
            <Route path="/worker" element={<PrivateRoute element={WorkerView} roles={['worker']} />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
