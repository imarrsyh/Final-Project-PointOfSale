import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addProductToCart: (state, action) => {
      state.items.push(action.payload);
    },

    removeProductFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
