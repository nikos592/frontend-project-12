import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalReducer from './modalSlice.js';
import loadingStateReducer from './loadingStateSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
    loadingState: loadingStateReducer,
  },
});
