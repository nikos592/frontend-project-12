import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { useContext, useEffect } from 'react';

import resources from './locales/index.js';
import store from './slices/index.js';
import AuthProvider from './providers/AuthProvider.jsx';
import ApiProvider from './providers/ApiProvider.jsx';
import App from './components/App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './contexts/index.jsx';

const init = async () => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    payload: {
      environment: 'production',
    },
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  const i18n = i18next.createInstance();

  i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <AuthProvider>
              <ApiProvider> 
                <App />
              </ApiProvider>
            </AuthProvider>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
