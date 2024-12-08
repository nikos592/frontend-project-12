import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../hooks/index.jsx';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    auth.user
      ? <Button onClick={auth.logOut} variant="primary">{t('buttons.logOut')}</Button>
      : null
  );
};

export default AuthButton;
