import React from 'react';
import { useDispatch } from 'react-redux';

import { ApiContext } from '../contexts/index.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const ApiProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    dispatch(channelsActions.addChannel(channel));
  });
  socket.on('renameChannel', ({ id, name }) => {
    dispatch(channelsActions.renameChannel({ id, changes: { name } }));
  });
  socket.on('removeChannel', ({ id }) => {
    dispatch(channelsActions.removeChannel(id));
  });

  const addMessage = async (body, channelId, username) => {
    await socket.emit('newMessage', { body, channelId, username });
  };

  const addChannel = async (values) => {
    const { data } = await socket.emitWithAck('newChannel', values);
    dispatch(channelsActions.addChannel(data));
    dispatch(channelsActions.changeChannel(data.id));
  };

  const renameChannel = async (id, name) => {
    await socket.emit('renameChannel', { id, name });
  };

  const removeChannel = async (id) => {
    await socket.emit('removeChannel', { id });
  };

  return (
    <ApiContext.Provider value={{
      addChannel, addMessage, renameChannel, removeChannel,
    }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
