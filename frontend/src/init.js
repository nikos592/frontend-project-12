import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import channelsApi from './api/channelsApi.js';
import messagesApi from './api/messagesApi.js';
import store from './store/store.js';
import App from './App.jsx';
import resources from './locales/index.js';
import { addRussianDictionary } from './utils/textFilter.js';
import { setDefaultChannel } from './store/slice/appSlice.js';

const init = async (socket) => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  };

  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    debug: false,
    lng: 'ru',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

  addRussianDictionary('ru');

  const listenerNewChannel = (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      draftChannels.push(payload);
    }));
  };

  const listenerRemoveChannel = (payload) => {
    const state = store.getState();
    if (state.app.currentChannelId === payload.id) {
      store.dispatch(setDefaultChannel(state.app.currentChannelId));
    }
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => draftChannels.filter(({ id }) => id !== payload.id)));
  };

  const listenerRenameChannel = (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const channel = draftChannels.find((item) => item.id === payload.id);
      channel.name = payload.name;
    }));
  };

  const listenerNewMessage = (payload) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
      draftMessages.push(payload);
    }));
  };

  socket.on('newChannel', listenerNewChannel);
  socket.on('removeChannel', listenerRemoveChannel);
  socket.on('renameChannel', listenerRenameChannel);
  socket.on('newMessage', listenerNewMessage);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nextInstance}>
            <App />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
