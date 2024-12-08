import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPageRoute } from '../utils/routes';
import { selectIsAuth } from '../store/slice/authSlice';

const PrivateRoute = ({ element: Component }) => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Component /> : <Navigate to={getPageRoute('PAGE_LOGIN')} />;
};

export default PrivateRoute;
