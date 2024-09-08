// fridgeItemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
};

const fridgeItemsSlice = createSlice({
  name: 'fridgeItems',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((_, id) => id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFridgeItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, removeItem, setLoading, setFridgeItems } = fridgeItemsSlice.actions;
export default fridgeItemsSlice.reducer;
