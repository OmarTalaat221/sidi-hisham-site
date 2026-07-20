import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  local: "ar",
  currency: "SYP",
  conversion: []
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state, action) => {
      // Handle case where state might be serialized as string
      if (typeof state === 'string') {
        try {
          const parsedState = JSON.parse(state);
          parsedState.local = action.payload;
          return parsedState;
        } catch (error) {
          console.error('Error parsing state:', error);
          return { ...initialState, local: action.payload };
        }
      }
      state.local = action.payload;
    },
    toggleCurrency: (state, action) => {
      // Handle case where state might be serialized as string
      if (typeof state === 'string') {
        try {
          const parsedState = JSON.parse(state);
          parsedState.currency = action.payload;
          return parsedState;
        } catch (error) {
          console.error('Error parsing state:', error);
          return { ...initialState, currency: action.payload };
        }
      }
      state.currency = action.payload;
    },
    setConversions: (state, action) => {
      // Handle case where state might be serialized as string
      if (typeof state === 'string') {
        try {
          const parsedState = JSON.parse(state);
          parsedState.conversion = action.payload;
          return parsedState;
        } catch (error) {
          console.error('Error parsing state:', error);
          return { ...initialState, conversion: action.payload };
        }
      }
      state.conversion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('language/fixState', (state, action) => {
        // Fix corrupted state by replacing it with parsed data
        return action.payload;
      })
      .addCase('language/resetState', () => {
        // Reset to initial state
        return initialState;
      });
  },
});

export const languageReducer = languageSlice.reducer;
export const { toggleLanguage, toggleCurrency, setConversions } = languageSlice.actions;
