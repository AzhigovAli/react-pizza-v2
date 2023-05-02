import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLocalStorage";

import { CartItem, CartSliceState } from "./types";

const initialState: CartSliceState = getCartFromLS();
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItems = state.items.find((obj) => obj.id === action.payload.id);
      if (findItems) {
        findItems.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItems = state.items.find((obj) => obj.id === action.payload);
      if (findItems) {
        findItems.count--;
      }
    },
    removeItems: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      if (state.items.length === 0) {
        state.totalPrice = 0;
      }
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItems, clearItems, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
