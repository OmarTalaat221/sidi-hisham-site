import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    amount: 0,
    total: 0,
    points: 0,
    discount: 0,
    currentQuantity: 1,
    coupons: [],
    couponValue: [],
    categoriesIds: [],
    usedCoupon: "",
  },
  reducers: {
    addToCart(state, action) {
      const id = action?.payload.product_id;
      const find = state.cart.find((item) => item.product_id === id);
      if (find) {
        state.cart = state.cart.filter(
          (item) => item.product_id !== find.product_id
        );
        // Append Order Number
        state.cart.push({
          ...find,
          quantity: action?.payload.order_number,
          order_number: action?.payload.order_number,
        });
      } else {
        state.cart.push({
          ...action?.payload,
          quantity: action?.payload.order_number,
          order_number: action?.payload.order_number,
        });
      }
    },
    addCoupon: (state, { payload }) => {
      const find = state.coupons?.find((item) => item === payload);
      if (!find) {
        state.coupons?.push(payload);
      }
    },
    removeCoupon: (state, { payload }) => {
      const find = state.coupons?.find((item) => item === payload);
      if (find) {
        state.coupons = [];
      }
    },
    addCategories: (state, { payload }) => {
      state.categoriesIds?.push(payload);
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.product_id === action.payload
      );
      if (item) {
        item.quantity++;
        state.currentQuantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.product_id === action.payload
      );
      if (item?.quantity === 1 && state.currentQuantity === 1) {
        item.quantity = 1;
        state.currentQuantity = 1;
      } else {
        item.quantity--;
        state.currentQuantity--;
      }
    },
    clearCurrentQuantity: (state) => {
      state.currentQuantity = 1;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item.product_id !== itemId);
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      let points = 0;
      let discount = 0;
      state.cart?.forEach((item) => {
        amount += item.quantity;
        total += item.quantity * item.price;
        points += item.points;
        discount += item.discount * item.quantity;
      });
      state.amount = amount;
      state.total = total;
      state.points = points;
      state.discount = discount;
    },
    clearCart: (state, action) => {
      (state.cart = []), (state.couponValue = []);
    },
    updateDiscount: (state, { payload }) => {
      state.couponValue[0] = payload;
      // state.couponValue += action.payload;
    },
    clearCoupon: (state, { payload }) => {
      state.couponValue[0] = 0;
    },
    addUsedCoupon: (state, { payload }) => {
      state.usedCoupon = payload;
    },
    clearUsedCoupon: (state, { payload }) => {
      state.usedCoupon = "";
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  calculateTotals,
  clearCurrentQuantity,
  clearCart,
  updateDiscount,
  addCoupon,
  addCategories,
  clearCoupon,
  addUsedCoupon,
  clearUsedCoupon,
} = cartSlice.actions;
