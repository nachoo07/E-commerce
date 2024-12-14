import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/login/LoginContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (auth !== 'admin') {
    return <Navigate />;
  }

  return children;
};

export default PrivateRoute;