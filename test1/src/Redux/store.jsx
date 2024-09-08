// store.js
import { configureStore } from '@reduxjs/toolkit';
import fridgeItemsReducer from './fridgeItemsSlice';

const store = configureStore({
  reducer: {
    fridgeItems: fridgeItemsReducer,
  },
});

export default store;
