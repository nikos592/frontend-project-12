import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/index.jsx';
import { routes } from './routes.js';

const MainRoute = () => {
  const auth = useAuth();

  return (
    auth.user
      ? <Navigate to={routes.chatPage()} />
      : <Outlet />
  );
};

export default MainRoute;
