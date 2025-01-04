import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { fetchMessages } from './fetchData.js';
import { actions as channelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, action) => {
        const channelId = action.payload; // Теперь payload - это id
        const channelMessages = Object
          .values(state.entities)
          .filter((message) => message.channelId === channelId)
          .map((message) => message.id);
        messagesAdapter.removeMany(state, channelMessages);
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        messagesAdapter.setAll(state, payload);
      });
  },
});

export const { actions } = messagesSlice;
const selectors = messagesAdapter.getSelectors((state) => state.messages);

export const customSelectors = {
  allMessages: selectors.selectAll,
  currentChannelMessages: createSelector(
    [selectors.selectAll, (state) => state.channels.currentChannelId],
    (allMessages, currentChannelId) => allMessages.filter(
      ({ channelId }) => channelId === currentChannelId,
    ),
  ),
};

export default messagesSlice.reducer;
