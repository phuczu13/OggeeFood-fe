import { configureStore } from '@reduxjs/toolkit';

// Import các reducers
import confirmOrderReducer from './slices/confirmOrderSlice';
// Thêm reducers khác nếu có ở đây

const store = configureStore({
  reducer: {
    confirmOrder: confirmOrderReducer,
    // Thêm reducers khác vào đây
  },
});

export default store;
