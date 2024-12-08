import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logOut, selectIsAuth } from '../store/slice/authSlice';
import { getPageRoute } from '../utils/routes';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate(getPageRoute('PAGE_LOGIN'));
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a
          className="navbar-brand"
          href="/"
        >
          {t('navBar.title')}
        </a>
        {isAuth && (
        <button
          className="btn btn-primary"
          onClick={handleLogout}
          type="button"
        >
          {t('navBar.button')}
        </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
