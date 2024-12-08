import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { apiRoutes } from '../routes/routes.js';

const fetchData = createAsyncThunk(
  'fetchData',
  async (header, { rejectWithValue }) => {
    try {
      const res = await axios.get(apiRoutes.dataPath(), { headers: header });

      return res.data;
    } catch (error) {
      if (error.isAxiosError) {
        return rejectWithValue(error.response.status);
      }

      throw error;
    }
  },
);

export default fetchData;
