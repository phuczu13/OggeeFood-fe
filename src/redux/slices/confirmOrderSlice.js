// redux/confirmOrderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const confirmOrderSlice = createSlice({
  name: 'confirmOrder',
  initialState: {
    isOpen: false,
    countdown: 15,
  },
  reducers: {
    openConfirmForm: (state) => {
      state.isOpen = true;
      state.countdown = 15;
    },
    closeConfirmForm: (state) => {
      state.isOpen = false;
    },
    decrementCountdown: (state) => {
      if (state.countdown > 0) state.countdown -= 1;
    },
  },
});

export const { openConfirmForm, closeConfirmForm, decrementCountdown } = confirmOrderSlice.actions;
export default confirmOrderSlice.reducer;
