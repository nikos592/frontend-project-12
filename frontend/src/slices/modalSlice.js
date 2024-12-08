/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { actions as loadingStateActions } from './loadingStateSlice';

const initialState = ({
  isOpen: false,
  type: null,
  context: null,
});

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, { payload: { type, context = null } }) => {
      state.isOpen = true;
      state.type = type;
      state.context = context;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadingStateActions.unload, () => initialState);
  },
});

const { actions } = modalSlice;
const selectors = {
  getModalType: (state) => state.modal.type,
  isModalOpen: (state) => state.modal.isOpen,
  getModalContext: (state) => state.modal.context,
};

export { actions, selectors };
export default modalSlice.reducer;
