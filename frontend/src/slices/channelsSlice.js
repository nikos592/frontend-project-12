/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { fetchChannels } from './fetchData.js'; // Импортируем новый асинхронный thunk

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        const newCurrentChannelId = state.ids[0];
        state.currentChannelId = newCurrentChannelId;
      }
      channelsAdapter.removeOne(state, payload);
    },
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        channelsAdapter.setAll(state, payload); // Обновляем каналы
        state.currentChannelId = payload.length > 0 ? payload[0].id : null; // Устанавливаем первый канал активным
      });
  },
});

export const { actions } = channelsSlice;
const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const customSelectors = {
  allChannels: selectors.selectAll,
  channelsNames: (state) => selectors.selectAll(state).map(({ name }) => name),
  currentChannel: (state) => {
    const { currentChannelId } = state.channels;

    return selectors.selectById(state, currentChannelId);
  },
};
export default channelsSlice.reducer;
