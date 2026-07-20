import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    addTofavorites: (state, action) => {
      const itemInfavorites = state.favorites?.find(
        (item) => item.product_id === action.payload.product_id
      );
      if (itemInfavorites) {
        state.favorites = state.favorites.filter(
          (item) => item.product_id !== action.payload.product_id
        );
      } else {
        state.favorites.push({ ...action.payload });
      }
    },
    // removeFromFavoris: (state, action) => {
    //   const removeItem = state.favorites.filter(
    //     (item) => item.id !== action.payload
    //   );
    //   state.favorites = removeItem;
    // },
  },
});

export const favoritesReducer = favoritesSlice.reducer;
export const {
  addTofavorites,
  // removeFromFavoris,
} = favoritesSlice.actions;
