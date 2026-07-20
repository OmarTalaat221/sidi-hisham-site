import { createSlice } from "@reduxjs/toolkit";

const branchSlice = createSlice({
  name: "branch",
  initialState: {
    branchID: 1,
  },
  reducers: {
    setBranchId: (state, { payload }) => {
      state.branchID = payload;
    },
  },
});

export const branchReducer = branchSlice.reducer;
export const { setBranchId } = branchSlice.actions;
