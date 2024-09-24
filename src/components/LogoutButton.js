import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  return (
    <Button type="danger" onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;
