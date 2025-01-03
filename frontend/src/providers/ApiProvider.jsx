import React, { useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { ApiContext, AuthContext } from '../contexts/index.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const ApiProvider = ({ children }) => {
  const { getAuthHeader } = useContext(AuthContext);
  const headers = getAuthHeader();
  const token = headers.Authorization ? headers.Authorization.split(' ')[1] : null;

  const dispatch = useDispatch();

  const apiMethods = useMemo(() => {
    const addMessage = async (body, channelId, username) => {
      const response = await axios.post('/api/v1/messages', {
        body,
        channelId,
        username,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(messagesActions.addMessage(response.data));
      return response.data;
    };

    const addChannel = async (name) => {
      const response = await axios.post('/api/v1/channels', {
        name,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(channelsActions.addChannel(response.data));
      dispatch(channelsActions.changeChannel(response.data.id));
      return response.data;
    };

    const renameChannel = async (id, name) => {
      const response = await axios.patch(`/api/v1/channels/${id}`, {
        name,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(channelsActions.renameChannel({ id, changes: { name } }));
      return response.data;
    };

    const removeChannel = async (id) => {
      const response = await axios.delete(`/api/v1/channels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(channelsActions.removeChannel(id));
      return response.data;
    };

    return {
      addChannel,
      addMessage,
      renameChannel,
      removeChannel,
    };
  }, [token, dispatch]);

  return (
    <ApiContext.Provider value={apiMethods}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
