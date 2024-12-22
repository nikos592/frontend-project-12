import { createSlice } from '@reduxjs/toolkit';

import fetchData from './fetchData.js';

export const stateLoad = {
  error: 'error',
  fail: 'fail',
  idle: 'idle',
  load: 'load',
  success: 'success',
};

const initialState = {
  status: stateLoad.idle,
};

const loadingStateSlice = createSlice({
  name: 'loadingState',
  initialState,
  reducers: {
    unload: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        console.log('Pending:', state);
        return { ...state, status: stateLoad.load };
      })
      .addCase(fetchData.fulfilled, (state) => {
        console.log('Fulfilled:', state);
        return { ...state, status: stateLoad.success };
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.log('Rejected:', state, action);
        if (action.payload?.status === 401) {
          return { ...state, status: stateLoad.error };
        }

        return { ...state, status: stateLoad.fail };
      });
  },
});

const { actions } = loadingStateSlice;

const selectors = {
  getStatus: (state) => state.loadingState.status,
};

export { actions, selectors };
export default loadingStateSlice.reducer;