import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../routes/routes';
import store from './index.js';
import { actions as loadingStateActions } from './loadingStateSlice.js';

export const fetchChannels = createAsyncThunk(
  'fetchChannels',
  async (header, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiRoutes.channelsPath(), { headers: header });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        store.dispatch(loadingStateActions.unload());
        return rejectWithValue({ status: 401, message: 'Unauthorized' });
      }
      if (!error.response) {
        throw error;
      }
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  },
);

export const fetchMessages = createAsyncThunk(
  'fetchMessages',
  async (header, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiRoutes.messagesPath(), { headers: header });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        store.dispatch(loadingStateActions.unload());
        return rejectWithValue({ status: 401, message: 'Unauthorized' });
      }
      if (!error.response) {
        throw error;
      }
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  },
);
