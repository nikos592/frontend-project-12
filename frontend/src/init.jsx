import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ErrorBoundary } from '@rollbar/react';

import { io } from 'socket.io-client';
import resources from './locales/index.js';
import store from './slices/index.js';
import AuthProvider from './providers/AuthProvider.jsx';
import ApiProvider from './providers/ApiProvider.jsx';
import App from './components/App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice';
import { FilterProvider } from './providers/FilterProvider.jsx';

const init = async () => {
  const rollbarConfig = {
    accessToken: import.meta.env.REACT_APP_ROLLBAR_TOKEN,
    environment: import.meta.env.MODE,
  };

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsActions.removeChannel(payload.id));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(
      channelsActions.renameChannel({
        id: payload.id,
        changes: { name: payload.name },
      }),
    );
  });

  const i18n = i18next.createInstance();

  i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
  });

  return (
    <ErrorBoundary config={rollbarConfig}>
      <FilterProvider>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <AuthProvider>
              <ApiProvider>
                <App />
              </ApiProvider>
            </AuthProvider>
          </Provider>
        </I18nextProvider>
      </FilterProvider>
    </ErrorBoundary>
  );
};

export default init;
