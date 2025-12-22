import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0 },

  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1 });
      } else {
        existingItem.quantity++;
      }
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        // Completely remove from cart
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--; // If quantity greater than 1 -- Just decrease the quantity by 1.
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

