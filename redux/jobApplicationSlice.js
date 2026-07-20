import { createSlice } from "@reduxjs/toolkit";

const jobApplicationSlice = createSlice({
  name: "jobApplication",
  initialState: {
    formData: [],
  },
  reducers: {
    addFormData: ({ formData }, { payload }) => {
      if (formData.length === 0) {
        formData.push(payload);
      } else {
        formData[0] = { ...formData[0], ...payload };
      }
    },
    clearFormData: (state,action)=>{
      state.formData=[]
    }
  },
});

export const jobApplicationReducer = jobApplicationSlice.reducer;
export const { addFormData,clearFormData } = jobApplicationSlice.actions;
