import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, roles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default PrivateRoute;
