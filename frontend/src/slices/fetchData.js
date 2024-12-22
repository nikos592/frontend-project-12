import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../routes/routes';

const fetchData = createAsyncThunk(
  'fetchData',
  async (header) => {
    try {
      const response = await axios.get(apiRoutes.dataPath(), { headers: header });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return Promise.reject({ status: error.response.status, data: error.response.data });
    }
  }
);

export default fetchData;
