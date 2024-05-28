// src/store/toastSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  visible: boolean;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description: string;
}

const initialState: ToastState = {
  visible: false,
  type: 'info',
  message: '',
  description: '',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<Omit<ToastState, 'visible'>>) {
      state.visible = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.description = action.payload.description;
    },
    hideToast(state) {
      state.visible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
