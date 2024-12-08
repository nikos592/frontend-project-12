import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import AuthButton from './AuthButton.jsx';

import { routes } from '../../routes/routes.js';

const Nav = () => {
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm" bg="white" expand="lg">
      <div className="container">
        <Navbar.Brand as={Link} to={routes.chatPage()}>{t('ui.hexletChat')}</Navbar.Brand>
        <AuthButton />
      </div>
    </Navbar>
  );
};

export default Nav;
