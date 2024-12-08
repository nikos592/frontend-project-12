import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/index.jsx';
import { routes } from './routes.js';

const ChatRoute = () => {
  const auth = useAuth();

  return (
    auth.user
      ? <Outlet />
      : <Navigate to={routes.loginPage()} />
  );
};

export default ChatRoute;
