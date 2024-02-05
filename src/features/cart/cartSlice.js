import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  // cart = {
  //    foodId,
  //    name,
  //    unitPrice,
  //    totalPrice,
  //    itemQuantity
  // }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = food item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = food item id
      state.cart = state.cart.filter((item) => item.foodId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.foodId === action.payload);

      item.itemQuantity++;
      item.totalPrice = item.itemQuantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.foodId === action.payload);

      item.itemQuantity--;
      item.totalPrice = item.itemQuantity * item.unitPrice;

      if (item.itemQuantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.foodId === id)?.itemQuantity ?? 0;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.itemQuantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// const newItem = {
//   foodId: id,
//   name: title,
//   itemQuantity: 1,
//   price,
//   totalPrice: price * 1,
// };
