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
      return Promise.reject({ status: error.response.status, data: error.response.data });
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
      return Promise.reject({ status: error.response.status, data: error.response.data });
    }
  },
);
