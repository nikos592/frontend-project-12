import React from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '../../routes/routes.js';

import image from '../../assets/error.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        className="img-fluid h-25"
        alt={t('ui.notFoundPage')}
        src={image}
      />
      <h1 className="h4 text-muted">{t('ui.notFoundPage')}</h1>
      <p className="text-muted">
        {t('ui.goTo')}
        <a href={routes.chatPage()}>{t('ui.mainPage')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
