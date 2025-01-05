import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../routes/routes';

export const fetchChannels = createAsyncThunk(
  'fetchChannels',
  async (header) => {
    try {
      const response = await axios.get(apiRoutes.channelsPath(), { headers: header });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return Promise.reject(new Error(`Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`));
    }
  },
);

export const fetchMessages = createAsyncThunk(
  'fetchMessages',
  async (header) => {
    try {
      const response = await axios.get(apiRoutes.messagesPath(), { headers: header });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return Promise.reject(new Error(`Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`));
    }
  },
);
