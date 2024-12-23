import { createSlice } from '@reduxjs/toolkit';
import { fetchChannels, fetchMessages } from './fetchData.js'; // Импортируем конкретные функции

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
      .addCase(fetchChannels.pending, (state) => {
        console.log('Pending:', state);
        return { ...state, status: stateLoad.load };
      })
      .addCase(fetchChannels.fulfilled, (state) => {
        console.log('Fulfilled:', state);
        return { ...state, status: stateLoad.success };
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        console.log('Rejected:', state, action);
        if (action.payload?.status === 401) {
          return { ...state, status: stateLoad.error };
        }

        return { ...state, status: stateLoad.fail };
      })
      .addCase(fetchMessages.pending, (state) => {
        console.log('Pending:', state);
        return { ...state, status: stateLoad.load };
      })
      .addCase(fetchMessages.fulfilled, (state) => {
        console.log('Fulfilled:', state);
        return { ...state, status: stateLoad.success };
      })
      .addCase(fetchMessages.rejected, (state, action) => {
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
