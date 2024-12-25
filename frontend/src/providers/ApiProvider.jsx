import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { ApiContext } from '../contexts/index.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const ApiProvider = ({ token, children }) => {
  const dispatch = useDispatch();

  const addMessage = async (body, channelId, username) => {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  const addChannel = async (name) => {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  const renameChannel = async (id, name) => {
    try {
      const response = await axios.patch(`/api/v1/channels/${id}`, {
        name,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      dispatch(channelsActions.renameChannel({ id, changes: { name } }));
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const removeChannel = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/channels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      dispatch(channelsActions.removeChannel(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <ApiContext.Provider value={{
      addChannel, addMessage, renameChannel, removeChannel,
    }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
