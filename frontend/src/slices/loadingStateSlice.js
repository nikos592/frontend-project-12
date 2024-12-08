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
      .addCase(fetchData.pending, () => stateLoad.load)
      .addCase(fetchData.fulfilled, () => stateLoad.success)
      .addCase(fetchData.rejected, (_state, action) => {
        if (action.payload === 401) {
          return stateLoad.error;
        }

        return stateLoad.fail;
      });
  },
});

const { actions } = loadingStateSlice;

const selectors = {
  getStatus: (state) => state.loadingState,
};

export { actions, selectors };
export default loadingStateSlice.reducer;
